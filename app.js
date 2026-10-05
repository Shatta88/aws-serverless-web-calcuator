// ==========================================
// AWS API Gateway URL
// ==========================================

const API_URL = "https://mu46issex8.execute-api.eu-north-1.amazonaws.com/Dev";

// ==========================================
// Configuration
// ==========================================


// ==========================================
// DOM references
// ==========================================

const calculatorForm = document.getElementById("calculator-form");
const resultValue = document.getElementById("result-value");

const conversionForm = document.getElementById("conversion-form");
const conversionValue = document.getElementById("conversion-value");

const historyList = document.getElementById("history-list");
const historyToggle = document.getElementById("history-toggle");
const historyContent = document.getElementById("history-content");
const historyArrow = document.getElementById("history-arrow");


// ==========================================
// Helper: Call Calculator API
// ==========================================

async function callCalculator(payload) {
    const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const apiResponse = await response.json();

    console.log("Calculator API response:", apiResponse);

    const data = JSON.parse(apiResponse.body);

    if (!data.success) {
        throw new Error(data.error || "Calculation failed");
    }

    return data;
}


// ==========================================
// Arithmetic Calculator
// ==========================================

calculatorForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const a = document.getElementById("number-a").value;
    const b = document.getElementById("number-b").value;
    const operation = document.getElementById("operation").value;

    resultValue.textContent = "Calculating...";
    resultValue.classList.remove("error");

    try {
        const data = await callCalculator({
            operation: operation,
            a: a,
            b: b
        });

        resultValue.textContent = data.result;

        // Refresh history after a successful calculation
        loadHistory();

    } catch (error) {
        console.error("Calculator error:", error);

        resultValue.textContent = error.message;
        resultValue.classList.add("error");
    }
});


// ==========================================
// Number-base Converter
// ==========================================

conversionForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const number = document.getElementById("base-number").value.trim();
    const fromBase = document.getElementById("from-base").value;
    const toBase = document.getElementById("to-base").value;

    conversionValue.textContent = "Converting...";
    conversionValue.classList.remove("error");

    try {
        const data = await callCalculator({
            operation: "convert_base",
            number: number,
            from_base: fromBase,
            to_base: toBase
        });

        conversionValue.textContent = data.result;

        // Refresh history after a successful conversion
        loadHistory();

    } catch (error) {
        console.error("Conversion error:", error);

        conversionValue.textContent = error.message;
        conversionValue.classList.add("error");
    }
});


// ==========================================
// Calculation History
// ==========================================

async function loadHistory() {

    historyList.innerHTML = `
        <p class="empty-state">Loading history...</p>
    `;

    try {
        const response = await fetch(`${API_URL}/history`);

        const apiResponse = await response.json();

        console.log("History API response:", apiResponse);

        const data = apiResponse.body
            ? JSON.parse(apiResponse.body)
            : apiResponse;

        if (!data.success) {
            throw new Error("Could not load calculation history");
        }

        const history = data.history || [];

        if (history.length === 0) {
            historyList.innerHTML = `
                <p class="empty-state">
                    No calculations yet.
                </p>
            `;
            return;
        }

        historyList.innerHTML = "";

        history.forEach(item => {
            const historyItem = document.createElement("div");

            historyItem.className = "history-item";

            historyItem.innerHTML = `
                <span class="calculation">
                    ${item.input}
                </span>

                <span class="history-result">
                    ${item.result}
                </span>
            `;

            historyList.appendChild(historyItem);
        });

    } catch (error) {
        console.error("History error:", error);

        historyList.innerHTML = `
            <p class="empty-state error">
                Unable to load calculation history.
            </p>
        `;
    }
}


// ==========================================
// History Toggle (collapse / expand)
// ==========================================

// Start collapsed
historyContent.classList.add("collapsed");

historyToggle.addEventListener("click", () => {
    const isCollapsed = historyContent.classList.toggle("collapsed");
    historyArrow.textContent = isCollapsed ? "▼" : "▲";
});


// ==========================================
// Initial load
// ==========================================

loadHistory();