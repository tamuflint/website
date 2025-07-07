use super::rocket;
use rocket::local::blocking::Client;
use rocket::http::{Status, ContentType};

#[test]
fn root() {
    let client = Client::tracked(rocket()).expect("valid rocket instance");
    let mut response = client.get(uri!(super::home)).dispatch();
    assert_eq!(response.status(), Status::SeeOther);
}

#[test]
fn assets() {
    let client = Client::tracked(rocket()).expect("valid rocket instance");
    let mut response = client.get(uri!("/assets/logo.png")).dispatch();
    assert_eq!(response.status(), Status::Ok);
    assert_eq!(response.content_type(), Some(ContentType::PNG));
}
