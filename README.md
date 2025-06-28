# tamuflint.org

# Development

## Front End

To run in development, it is recommended you use the live server extension for VSCode available [here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
You can also search for this in the extensions tab on the left.
To start it, press "go live" in the bottom right, and it should open a local port in a browser (usually port 5500).

## Backend

The backend of the server is built on rust using the [Rocket.rs](https://rocket.rs) crate.

To contribute to the backend, you will need cargo, as well as rustc. These are all installed when you install rust using rustup as is recommended on the [official rust website](https://www.rust-lang.org).

You can run the backend using the `cargo run` command from within the backend directory. Be aware, compilation can take a while due to the size of the rocket crate, and your first run will take the longest as all compilation targets, not just the ones you change, need to be compiled.
