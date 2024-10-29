import { NewcoinListener } from "./agents/listener";

const token = "newsafe eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsIjp7Im9yaWdpbiI6ImZpcmViYXNlIn0sImlkZW50aXR5Ijp7ImlkIjoiMzRjN2FlODgtZDZiNS0xOWExLTY1MDYtYmU4ODEyNTBlNGJiIiwidXNlcm5hbWUiOiJpZ29ycnViaW5vdmljaC5uY28iLCJwaG9uZSI6IiJ9LCJyZXF1ZXN0b3IiOiJuZXdzYWZlLWV1LXByb2QiLCJzY29wZXMiOm51bGwsImNvbmZpZyI6eyJjcmVhdGVkIjoiMjAyNC0wOC0xOVQwODozNzoxNS42NDVaIiwiZXhwaXJlcyI6IjIwMjQtMDgtMTlUMDk6MDc6MTUuNjQ1WiIsInJlbmV3YWJsZSI6dHJ1ZX0sInRyYWNlIjp7Im9yaWdpbmFsIjoiMjAyNC0wOC0xOVQwODozNzoxNS42NDVaIiwiZ2VuZXJhdGlvbiI6MH0sInJlcXVlc3QiOnsiYXBwT3duZXIiOiJuZXdzYWZlLWV1LXByb2QiLCJzY29wZXMiOm51bGx9LCJhdXRob3JpdHkiOiJhdXRoLm5ld3NhZmUub3JnIiwidmVyc2lvbiI6IjEiLCJpYXQiOjE3MjQwNTY2MzV9.QHv0V0BJblGujKLWi13deG4yMYB8J1ICGUHk_wx5BNIXid8Au5LrIR_aQ6W0aHvxjMi3vq49Hl2QUOped4wMz8Z2QmeuV9U4hM3g8SuzbtoB9sIaQl--0nO8eRiO6UD65h1tgkJMjTT6jMc5cteXrIq879xZRLIXVgxQG7EUR6Q03oBB5a5eeyVCMMFIwg-qv9W3J7XwDBEDiank8YxhvVkLdijCASUEbrUBAZiQHZj94va_FFq1X_xQHaGjHa54_hXZJ49MGKvSDysgV48RjUlshW1tUPLLAAeE3YQEHSR1ttqKMID9jaAYsCFbTadxKRsD_xI9t2TNGk122fiqlwN6XcQ9sw_8eKeRhvJ5E6VFiI822fVbpy_ST_L-7F37tp_8Q-3eupTzZq2Gn9czeeCsWWja5Qcj0uHL_rMXTgt-U4hC2hPnI7G6_EVjUle5ejV4TnyuRKWyYCfFu0UsZFOz4lDRXCX29HzQcG7unywM7W2Ix9yYpllaTnWtmDOW";

NewcoinListener(token, async (msg: string) => {
    // go to an Api

    // talk to ollama...

    // return `I heard you say: ${msg}`;
    return { 
        content: `I heard you say: ${msg}`,
        filesPaths: ["./assets/images/sheep.jpg"]
    }
})