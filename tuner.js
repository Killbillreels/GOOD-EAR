// tuner.js

const notes = [
    { note: "C0", frequency: 16.35 },
    { note: "C#0/Db0", frequency: 17.32 },
    { note: "D0", frequency: 18.35 },
    { note: "D#0/Eb0", frequency: 19.45 },
    { note: "E0", frequency: 20.60 },
    { note: "F0", frequency: 21.83 },
    { note: "F#0/Gb0", frequency: 23.12 },
    { note: "G0", frequency: 24.50 },
    { note: "G#0/Ab0", frequency: 25.96 },
    { note: "A0", frequency: 27.50 },
    { note: "A#0/Bb0", frequency: 29.14 },
    { note: "B0", frequency: 30.87 },
    { note: "C1", frequency: 32.70 },
    { note: "C#1/Db1", frequency: 34.65 },
    { note: "D1", frequency: 36.71 },
    { note: "D#1/Eb1", frequency: 38.89 },
    { note: "E1", frequency: 41.20 },
    { note: "F1", frequency: 43.65 },
    { note: "F#1/Gb1", frequency: 46.25 },
    { note: "G1", frequency: 49.00 },
    { note: "G#1/Ab1", frequency: 51.91 },
    { note: "A1", frequency: 55.00 },
    { note: "A#1/Bb1", frequency: 58.27 },
    { note: "B1", frequency: 61.74 },
    { note: "C2", frequency: 65.41 },
    { note: "C#2/Db2", frequency: 69.30 },
    { note: "D2", frequency: 73.42 },
    { note: "D#2/Eb2", frequency: 77.78 },
    { note: "E2", frequency: 82.41 },
    { note: "F2", frequency: 87.31 },
    { note: "F#2/Gb2", frequency: 92.50 },
    { note: "G2", frequency: 98.00 },
    { note: "G#2/Ab2", frequency: 103.83 },
    { note: "A2", frequency: 110.00 },
    { note: "A#2/Bb2", frequency: 116.54 },
    { note: "B2", frequency: 123.47 },
    { note: "C3", frequency: 130.81 },
    { note: "C#3/Db3", frequency: 138.59 },
    { note: "D3", frequency: 146.83 },
    { note: "D#3/Eb3", frequency: 155.56 },
    { note: "E3", frequency: 164.81 },
    { note: "F3", frequency: 174.61 },
    { note: "F#3/Gb3", frequency: 185.00 },
    { note: "G3", frequency: 196.00 },
    { note: "G#3/Ab3", frequency: 207.65 },
    { note: "A3", frequency: 220.00 },
    { note: "A#3/Bb3", frequency: 233.08 },
    { note: "B3", frequency: 246.94 },
    { note: "C4", frequency: 261.63 },
    { note: "C#4/Db4", frequency: 277.18 },
    { note: "D4", frequency: 293.66 },
    { note: "D#4/Eb4", frequency: 311.13 },
    { note: "E4", frequency: 329.63 },
    { note: "F4", frequency: 349.23 },
    { note: "F#4/Gb4", frequency: 369.99 },
    { note: "G4", frequency: 392.00 },
    { note: "G#4/Ab4", frequency: 415.30 },
    { note: "A4", frequency: 440.00 },
    { note: "A#4/Bb4", frequency: 466.16 },
    { note: "B4", frequency: 493.88 },
    { note: "C5", frequency: 523.25 },
    { note: "C#5/Db5", frequency: 554.37 },
    { note: "D5", frequency: 587.33 },
    { note: "D#5/Eb5", frequency: 622.25 },
    { note: "E5", frequency: 659.25 },
    { note: "F5", frequency: 698.46 },
    { note: "F#5/Gb5", frequency: 739.99 },
    { note: "G5", frequency: 783.99 },
    { note: "G#5/Ab5", frequency: 830.61 },
    { note: "A5", frequency: 880.00 },
    { note: "A#5/Bb5", frequency: 932.33 },
    { note: "B5", frequency: 987.77 },
    { note: "C6", frequency: 1046.50 },
    { note: "C#6/Db6", frequency: 1108.73 },
    { note: "D6", frequency: 1174.66 },
    { note: "D#6/Eb6", frequency: 1244.51 },
    { note: "E6", frequency: 1318.51 },
    { note: "F6", frequency: 1396.91 },
    { note: "F#6/Gb6", frequency: 1479.98 },
    { note: "G6", frequency: 1567.98 },
    { note: "G#6/Ab6", frequency: 1661.22 },
    { note: "A6", frequency: 1760.00 },
    { note: "A#6/Bb6", frequency: 1864.66 },
    { note: "B6", frequency: 1975.53 },
    { note: "C7", frequency: 2093.00 },
    { note: "C#7/Db7", frequency: 2217.46 },
    { note: "D7", frequency: 2349.32 },
    { note: "D#7/Eb7", frequency: 2489.02 },
    { note: "E7", frequency: 2637.02 },
    { note: "F7", frequency: 2793.83 },
    { note: "F#7/Gb7", frequency: 2959.96 },
    { note: "G7", frequency: 3135.96 },
    { note: "G#7/Ab7", frequency: 3322.44 },
    { note: "A7", frequency: 3520.00 },
    { note: "A#7/Bb7", frequency: 3729.31 },
    { note: "B7", frequency: 3951.07 },
    { note: "C8", frequency: 4186.01 }
];

let audioContext;
let analyser;
let microphone;
let isTuning = false;

function getClosestNoteFrequency(frequency) {
    let closestNote = notes[0];
    let minDiff = Math.abs(frequency - closestNote.frequency);

    for (let i = 1; i < notes.length; i++) {
        const diff = Math.abs(frequency - notes[i].frequency);
        if (diff < minDiff) {
            closestNote = notes[i];
            minDiff = diff;
        }
    }
    return closestNote;
}

async function startTuner() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioContext.createMediaStreamSource(microphone);
    source.connect(analyser);

    analyser.fftSize = 2048;
    const bufferLength = analyser.fftSize;
    const dataArray = new Float32Array(bufferLength);

    function updateTuner() {
        if (!isTuning) return;

        analyser.getFloatTimeDomainData(dataArray);
        const frequency = autoCorrelate(dataArray, audioContext.sampleRate);
        if (frequency !== -1) {
            const closestNote = getClosestNoteFrequency(frequency);
            document.getElementById("note").textContent = closestNote.note;
            document.getElementById("frequency").textContent = `${frequency.toFixed(2)} Hz`;
        }
        requestAnimationFrame(updateTuner);
    }

    updateTuner();
}

function stopTuner() {
    if (microphone) {
        microphone.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
        audioContext.close();
    }
    document.getElementById("note").textContent = "-";
    document.getElementById("frequency").textContent = "- Hz";
}

function toggleTuner() {
    if (isTuning) {
        stopTuner();
        document.getElementById("toggleButton").textContent = "Start Tuning";
    } else {
        startTuner();
        document.getElementById("toggleButton").textContent = "Stop Tuning";
    }
    isTuning = !isTuning;
}

function autoCorrelate(buffer, sampleRate) {
    const SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
        const val = buffer[i];
        rms += val * val;
    }

    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }

    buffer = buffer.slice(r1, r2);
    const newSize = buffer.length;

    const c = new Array(newSize).fill(0);
    for (let i = 0; i < newSize; i++) {
        for (let j = 0; j < newSize - i; j++) {
            c[i] = c[i] + buffer[j] * buffer[j + i];
        }
    }

    let d = 0; 
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < newSize; i++) {
        if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
    }
    let T0 = maxpos;

    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
}
