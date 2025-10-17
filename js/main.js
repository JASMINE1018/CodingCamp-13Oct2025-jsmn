document.addEventListener('DOMContentLoaded', () => {
    const myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++){
        const span = document.createElement("SPAN");
        span.className = "close";
        span.textContent = "\u00D7";
        myNodelist[i].appendChild(span);
    }

    function attachCloseHandlers(){
        const close = document.getElementsByClassName("close");
        for (let i = 0; i < close.length; i++){
            close[i].onclick = function() {
                this.parentElement.style.display = "none";
            }
        }
    }

    attachCloseHandlers();

    const list = document.querySelector('#myUL');
    if (list) {
        list.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
            }
        }, false);
    }

    // expose newElement so HTML onclick="newElement()" still works
    window.newElement = function() {
        const li = document.createElement("li");
        const inputValue = document.getElementById("myInput").value.trim();
        const dateValue = document.getElementById("myDateInput").value; // read date input

        if (inputValue === '') {
            alert("You must write something!");
            return;
        }

        // main text
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = inputValue;
        li.appendChild(textSpan);

        // if date provided, add date span
        if (dateValue) {
            const d = new Date(dateValue);
            const dateSpan = document.createElement('span');
            dateSpan.className = 'task-date';
            // format date to local string (e.g., 10/17/2025)
            dateSpan.textContent = ' • ' + d.toLocaleDateString();
            li.appendChild(dateSpan);
            // store raw date for potential filtering/sorting
            li.dataset.date = dateValue;
        }

        const span = document.createElement("SPAN");
        span.className = "close";
        span.textContent = "\u00D7";
        li.appendChild(span);

        const ul = document.getElementById("myUL");
        if (ul) {
            ul.appendChild(li);
        }

        // clear inputs
        document.getElementById("myInput").value = "";
        document.getElementById("myDateInput").value = "";

        attachCloseHandlers();
    }

    // make filter available globally for onkeyup
    window.myFunction = function() {
        const input = document.getElementById('mySearch');
        if (!input) return;
        const filter = input.value.toLowerCase();
        const ul = document.getElementById("myUL");
        if (!ul) return;
        const li = ul.getElementsByTagName('li');

        for (let i = 0; i < li.length; i++) {
            const txt = (li[i].textContent || li[i].innerText);
            if (txt.toLowerCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    };
});
