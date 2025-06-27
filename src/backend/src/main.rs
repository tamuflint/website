#[macro_use] extern crate rocket;
use rocket::fs::{FileServer, relative};
use rocket::response::Redirect;

// Redirects root to /public/ to access fileserver which includes actual public site
#[get("/")]
fn home() -> Redirect {
    Redirect::to("/public/index.html")
}

// To prevent path resolution issues from /public
// css and js for index will not load at /public but will at /public/
#[get("/public")]
fn redirect_public() -> Redirect {
    Redirect::to("/public/index.html")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![home, redirect_public])
        .mount("/public", FileServer::from(relative!("../frontend")))
}
