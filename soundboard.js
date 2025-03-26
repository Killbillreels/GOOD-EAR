document.addEventListener("DOMContentLoaded", function() {
    var audioElements = [
        document.getElementById("audio1"),
        document.getElementById("audio2"),
        document.getElementById("audio3"),
        document.getElementById("audio4")
    ];
    var loopSwitch = document.getElementById("loop-switch");
    var stopButton = document.getElementById("stop-button");
    var playingNotes = [];

    // Event listener for the soundboard buttons
    document.querySelectorAll(".note").forEach(function(button) {
        button.addEventListener("click", function() {
            var note = button.getAttribute("data-note");
            if (playingNotes.length < 4) {
                playSound(note);
            }
        });
    });

    // Function to play the sound for the given note
    function playSound(note) {
        for (var i = 0; i < audioElements.length; i++) {
            if (audioElements[i].paused) {
                audioElements[i].src = "notes/" + note + ".wav"; // Update the audio source
                audioElements[i].loop = loopSwitch.checked; // Set loop based on switch
                audioElements[i].play(); // Play the audio
                playingNotes.push(audioElements[i]);
                break;
            }
        }
    }

    // Event listener for the stop button
    stopButton.addEventListener("click", function() {
        stopAllNotes();
    });

    // Function to stop all playing notes
    function stopAllNotes() {
        playingNotes.forEach(function(audio) {
            audio.pause();
            audio.currentTime = 0;
        });
        playingNotes = [];
    }
});
