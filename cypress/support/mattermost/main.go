package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/mattermost/mattermost-server/v5/model"
	"github.com/spf13/viper"
)

type otpMessage struct {
	Sneder  string
	Device  string
	Version string
	Code    string
}

func main() {
	path, err := os.Executable()
	if err != nil {
		log.Println(err)
	}
	base := filepath.Dir(path)

	configPath := filepath.Join(base, "config.json")

	viper.SetConfigFile(configPath)
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file, %s", err)
	}

	username := viper.GetString("account.username")
	password := viper.GetString("account.password")
	profile := os.Args[1]

	prefetchSeconds := viper.GetInt("prefetchSeconds")
	// if len(os.Args) == 2 {
	// 	prefetchSeconds, _ = strconv.Atoi(os.Args[2])
	// }

	targeSender := viper.GetString(fmt.Sprintf("profiles.%s.sender", profile))
	targetDevice := viper.GetString(fmt.Sprintf("profiles.%s.device", profile))

	client := model.NewAPIv4Client("https://mattermost.brankas.dev")
	client.Login(username, password)
	defer client.Logout()

	// user, _ := client.GetUser("me", "")
	// log.Println(user.Id, user.Email)

	team, _ := client.GetTeamByName("Product", "")
	// log.Println(team.Id, team.DisplayName)

	channel, _ := client.GetChannelByName("OTP", team.Id, "")

	now := time.Now().UnixMilli() - int64(prefetchSeconds*1000) // check from several seconds ago
	timeoutSeconds := viper.GetInt("timeout")

	// check message from -2s ~ timeout
	for i := 0; i < int(timeoutSeconds/3); i++ {
		posts, _ := client.GetPostsSince(channel.Id, now, true)
		if len(posts.Posts) == 0 {
			time.Sleep(3 * time.Second)
			continue
		}

		for postID := range posts.Posts {
			post, _ := client.GetPost(postID, "")
			if !isOTPMessage(post.Message) {
				continue
			}
			otp := parseMessage(post)
			if otp.Sneder == targeSender {
				if targetDevice != "" {
					if strings.Contains(otp.Device, targetDevice) {
						fmt.Printf("%v", otp.Code)
						return
					}
				} else {
					fmt.Printf("%v", otp.Code)
					return
				}
			}
		}
		time.Sleep(3 * time.Second)
	}
}

func isOTPMessage(msg string) bool {
	messages := strings.Split(msg, "\n")
	return len(messages) > 2 &&
		strings.Contains(msg, "Message") &&
		strings.Contains(msg, "Device") &&
		strings.Contains(msg, "Version")
}

func parseMessage(post *model.Post) *otpMessage {
	result := &otpMessage{
		Sneder: fmt.Sprint(post.GetProp("override_username")),
	}
	lines := strings.Split(post.Message, "\n")
	for _, line := range lines {
		switch {
		case strings.HasPrefix(line, "**Message:**"):
			content := strings.SplitN(line, " ", 2)[1]
			parts := strings.SplitN(content, "***", 3)
			if len(parts) == 3 {
				result.Code = parts[1]
			} else {
				return nil
			}
		case strings.HasPrefix(line, "**Device:**"):
			result.Device = strings.SplitN(line, " ", 2)[1]
		case strings.HasPrefix(line, "**Version:**"):
			result.Version = strings.SplitN(line, " ", 2)[1]
		}
	}
	return result
}
