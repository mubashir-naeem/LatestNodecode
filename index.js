document.getElementById('display');
document.getElementById('spinner').style.display = 'none';
document.getElementById("block").style.display = "none";
let buttons = Array.from(document.getElementsByClassName('button'));
var a = '';
var b = '';
var ans = true;
var op = null;
buttons.map( button => {
    button.addEventListener('click', (e) => {
        if(ans === true){
            display.innerText = '';
            ans = false;
        }
        switch(e.target.innerText){
            case 'C':
                display.innerText = '';
                a = b = '';
                op = null;
                break;
            case '=':
                try{
                    getUsers();
                } catch {
                    display.innerText = "Error"
                    a = b = op = null;
                }
                break;
            default:
            if(display.innerText == "Invalid"){
                display.innerText = "";
            }
                if(e.target.classList.contains("num"))
                {
                    if(op == null){
                        a += e.target.innerText;
                    }
                    else {
                        b += e.target.innerText;
                    }
                    // else{
                    //     display.innerText = "Invalid";
                    //     a = b = op = null;
                    // }
                }
                if(e.target.classList.contains("op"))
                {
                    if(op == null){
                        if(e.target.innerText == "/"){
                            op = "div"
                        }
                        else{
                            op = e.target.innerText;
                        }
                    }
                    else{
                        display.innerText = "Invalid";
                        a = b = '';
                        op = null;
                    }
                }
                display.innerText += e.target.innerText;
        }
    });
});
//http://ffce-111-68-97-205.ngrok.io/calculator/2/+/2
function getUsers() {
    if(a != "" && b != "" && op != null) {
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('data').style.display = 'none';
        uri = "http://d9fe-203-175-72-28.ngrok.io/calculator/" + a + "/" + op + "/" + b;
        var url = encodeURI(uri);
        console.log(url);
        fetch(url, {method: "GET"}
        ).then(response => {
            return response.json()
        }).then((data) => {
            ans = true;
            document.getElementById('data').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';
            document.getElementById("history").innerText = "";
            document.getElementById("block").style.display = "none"
            if (data[0]['status'] === -1) {
                document.getElementById("block").style.display = "block"
                display.innerText = "";
            } else if (data[0]['status'] === 1) {
                display.innerText = data[0]["answer"];
            } else if (data[0]['status'] === 0) {
                display.innerText = "Invalid";
            }
            if (data[1]) {
                for (var i = data[1]["total_requests"] - data[1]["count"]; i < data[1]["total_requests"]; i++) {
                    document.getElementById("history").prepend(data[1]['requests'][i]["id"] + ". " + data[1]['requests'][i]["equation"] + "    (" + data[1]['requests'][i]["time_stamp"] + ")");
                    document.getElementById("history").prepend(document.createElement('br'));
                }
            }
            a = b = '';
            op = null;
            console.log(data);
        }).catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
    else{
        display.innerText = "Invalid";
    }
}
