let array = [];

function generateArray() {
    array = [];
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 300) + 10);
    }
    displayArray();
}

function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        const bar = document.createElement('div');
        bar.style.height = `${array[i]}px`;
        bar.style.width = '40px';  // Fixed width for 10 elements
        bar.classList.add('array-bar');

        const number = document.createElement('div');
        number.innerText = array[i];
        number.classList.add('number');

        barContainer.appendChild(bar);
        barContainer.appendChild(number);
        arrayContainer.appendChild(barContainer);
    }
}

async function sortArray(type) {
    disableControls();
    switch(type) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'merge':
            await mergeSort(array, 0, array.length - 1);
            break;
    }
    enableControls();
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#ff5733'; // Color for the current comparison
            bars[j + 1].style.backgroundColor = '#ff5733'; // Color for the current comparison
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                displayArray();
                await sleep(300);
            }
            bars[j].style.backgroundColor = '#007bff'; // Revert color after comparison
            bars[j + 1].style.backgroundColor = '#007bff'; // Revert color after comparison
        }
        bars[array.length - i - 1].style.backgroundColor = '#28a745'; // Mark the sorted part
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            displayArray();
            await sleep(300);
        }
        array[j + 1] = key;
        displayArray();
        await sleep(300);
    }
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted');
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        displayArray();
        await sleep(300);
    }
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted');
    }
}

async function mergeSort(arr, left, right) {
    if (left >= right) {
        return;
    }
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
    displayArray();
    await sleep(300);
}

async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (let i = 0; i < n2; i++) {
        R[i] = arr[mid + 1 + i];
    }

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        displayArray();
        await sleep(300);
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        displayArray();
        await sleep(300);
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        displayArray();
        await sleep(300);
    }

    // Mark the sorted portion in green
    for (let i = left; i <= right; i++) {
        const bar = document.getElementsByClassName('array-bar')[i];
        bar.style.backgroundColor = '#28a745'; // Mark as sorted
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function disableControls() {
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(button => button.disabled = true);
}

function enableControls() {
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(button => button.disabled = false);
}
