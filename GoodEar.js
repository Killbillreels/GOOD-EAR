document.addEventListener("DOMContentLoaded", function() {
    // Get elements for pitch trainer
    var notesDropdown = document.getElementById("notes");
    var playButton = document.getElementById("play-button");
    var audioElement = document.getElementById("audio");
    var loopSwitch = document.createElement('input');
    loopSwitch.type = 'checkbox';
    loopSwitch.id = 'loop-switch';
    loopSwitch.style.marginLeft = '10px';
    playButton.parentNode.insertBefore(loopSwitch, playButton.nextSibling);

    // Event listener for the play button in pitch trainer
    playButton.addEventListener("click", function() {
        var selectedNote = notesDropdown ? notesDropdown.value : "C"; // Default to C if no dropdown
        playPitch(selectedNote);
    });

    // Event listener for the loop switch
    loopSwitch.addEventListener("change", function() {
        audioElement.loop = this.checked;
    });

    // Function to play the selected note in pitch trainer
    function playPitch(note) {
        audioElement.src = "notes/" + note + ".wav"; // Update the audio source
        audioElement.play(); // Play the audio
    }

    // Get all buttons with the class 'note' for soundboard
    var buttons = document.querySelectorAll('.note');

    // Add click event listener to each button in soundboard
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the value of the 'data-note' attribute of the button
            var note = this.getAttribute('data-note');
            // Play the note
            playPianoSound(note);
        });
    });

    // Function to play the piano sound based on the note provided in soundboard
    function playPianoSound(note) {
        // Create a new Audio object with the source of the piano note
        var audio = new Audio('notes/' + note + '.wav');
        // Play the audio
        audio.play();
    }
});
