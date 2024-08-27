let scriptHeader = `
        <li class="nav-item">
            <div class="row">
                <div class="col-9 pr-0">
                    <a class="nav-link w-100" data-toggle="pill" href="#">Header</a>
                </div>
                <div class="col-2">
                    <a class="icon" style="color: red;"><i class="bi bi-trash3  h6"></i></a>
                </div>
            </div>
        </li>`;

document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const users = db.collection("users");

    document.getElementById('run-btn').addEventListener('click', () => {
        const html = htmlCode.value;
        const css = `<style>${cssCode.value}</style>`;
        const js = `<script>${jsCode.value}<\/script>`;

        output.innerHTML = html + css + js;
    });

});

function renderData() {
    const ul = document.querySelector('#sidebar ul');
    const user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
        const db = firebase.firestore();
        userScripts = db.collection("users").doc(user.uid).collection('scripts');
        userScripts.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                ul.innerHTML += scriptHeader.replace("Header", doc.id);
            });
        });
    });
}

function addScript() {
    let scriptName = prompt('Enter script name here');
    const ul = document.querySelector('#sidebar ul');
    ul.innerHTML += scriptHeader.replace("Header", scriptName);
}

function googleLogin() {
    const db = firebase.firestore();

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        console.log(user.displayName);  
        console.log(user);  
        
    }).catch(console.log)
    console.log("hello")
    
    
    firebase.auth().onAuthStateChanged((user) => {
        userRef = db.collection("users").doc(user.uid);
        if (user) {
          userRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                renderData()
                document.getElementById("signup-btn").style.visibility = "hidden";
            } else {
                userRef.set({
                    mail: user.email,
                    profile: user.photoURL,
                }).then(() => {
                    console.log("Document successfully written!");
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        } else {
            console.log("Error getting user");
        }
      });
    
}

function getScriptName() {
    const links = document.querySelectorAll('#sidebar a');
    for (let i = 0; i < links.length; i++) {
        if (links[i].classList.contains('active')) {
            return links[i].innerHTML
        }
    }
    
}

function testfunc() {
    const user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
        const db = firebase.firestore();
    userScripts = db.collection("users").doc(user.uid).collection('scripts').doc(getScriptName());

    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');

    userScripts.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            userScripts.set({
                html: htmlCode.value,
                css: cssCode.value,
                js: jsCode.value
            }).then(() => {
                console.log("Code successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });    
    });

    
}