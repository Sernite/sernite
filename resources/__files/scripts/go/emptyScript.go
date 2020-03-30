
import (
	sernite "github.com/Sernite/gosernite"
)

func main() {

	// Set handler function
	sernite.SetHandler(func(send sernite.SendFunc, nitmsg sernite.NitMsg) {

	})

	// Start handler
	sernite.Run()
}
