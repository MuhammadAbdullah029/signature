var canvas = document.getElementById('signature-pad');
        var signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'gray'
        });

        function resizeCanvas() {
            var ratio =  Math.max(window.devicePixelRatio || 5, 5);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            signaturePad.clear();
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        document.getElementById('clear').addEventListener('click', function() {
            signaturePad.clear();
            location.reload();
        });

        document.getElementById('download-hand').addEventListener('click', function() {
            if (signaturePad.isEmpty()) {
                alert("Please provide a signature first.");
            } else {
                var dataURL = signaturePad.toDataURL();
                downloadSignature(dataURL, "hand-signature.png");
            }
        });

        document.getElementById('generate').addEventListener('click', function() {
            var name = document.getElementById('name').value;
            if (name) {
                var previewContainer = document.getElementById('preview-container');
                previewContainer.innerHTML = '';
                var fonts = [
                    "Pacifico, cursive",
                    "Dancing Script, cursive",
                    "Great Vibes, cursive",
                    "Satisfy, cursive",
                    "Tangerine, cursive",
                    "Allura, cursive"
                ];
                fonts.forEach(function(font) {
                    var preview = document.createElement('div');
                    preview.className = 'preview';
                    preview.style.fontFamily = font;
                    preview.innerText = name;
                    preview.addEventListener('click', function() {
                        document.querySelectorAll('.preview').forEach(p => p.classList.remove('selected'));
                        this.classList.add('selected');
                        document.getElementById('download-typed').style.display = 'block';
                    });
                    previewContainer.appendChild(preview);
                });
            } else {
                alert("Please enter your name.");
            }
        });

        document.getElementById('download-typed').addEventListener('click', function() {
            var selectedPreview = document.querySelector('.preview.selected');
            if (selectedPreview) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var text = selectedPreview.innerText;
                var font = window.getComputedStyle(selectedPreview).font;

                canvas.width = 600;
                canvas.height = 200;
                context.font = font;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = 'black';
                context.fillText(text, canvas.width / 2, canvas.height / 2);

                var dataURL = canvas.toDataURL();
                downloadSignature(dataURL, "typed-signature.png");
            } else {
                alert("Please select a signature style.");
            }
        });

        function downloadSignature(dataURL, filename) {
            var link = document.createElement('a');
            link.href = dataURL;
            link.download = filename;
            link.click();
        }