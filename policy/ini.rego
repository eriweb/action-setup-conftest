package main

deny[msg] {
    not input.message.text = "Hello World"
    msg = "Input message should be 'Hello World'"
}