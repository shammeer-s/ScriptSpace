document.addEventListener('DOMContentLoaded', () => {
    const scripts = {
        script1: {
            html: '<div class="alert alert-info">Hello from Script 1 HTML</div>',
            css: 'div { color: red; }',
            js: 'document.write("Hello from Script 1 JS");'
        },
        script2: {
            html: '<div class="alert alert-success">Hello from Script 2 HTML</div>',
            css: 'div { color: green; }',
            js: 'document.write("Hello from Script 2 JS");'
        }, 
        script3: {
            html: '<div class="alert alert-warning">Hello from Script 3 HTML</div>',
            css: 'div { color: orange; }',
            js: 'document.write("Hello from Script 3 JS");'
        }
    };
 
    const sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    const output = document.getElementById('output');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            const scriptKey = this.getAttribute('data-script');
            const script = scripts[scriptKey];

            if (script) {
                htmlCode.value = script.html;
                cssCode.value = script.css;
                jsCode.value = script.js;

                sidebarLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    document.getElementById('run-btn').addEventListener('click', () => {
        const html = htmlCode.value;
        const css = `<style>${cssCode.value}</style>`;
        const js = `<script>${jsCode.value}<\/script>`;

        output.innerHTML = html + css + js;
    });
});
