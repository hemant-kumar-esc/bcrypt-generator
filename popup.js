const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const status = document.getElementById("status");

generateBtn.addEventListener("click", () => {
  const input = document.getElementById("inputText").value;
  const weightage = parseInt(document.getElementById("weightage").value);
  const output = document.getElementById("output");

  if (!input) {
    status.textContent = "❌ Please enter a string";
    return;
  }

  generateBtn.disabled = true;
  status.textContent = "⏳ Generating hash...";

  setTimeout(() => {
    try {
      const salt = dcodeIO.bcrypt.genSaltSync(weightage);
      const hash = dcodeIO.bcrypt.hashSync(input, salt);
      output.value = hash;
      status.textContent = `✅ Hash generated (cost: ${weightage})`;
    } catch (e) {
      status.textContent = "❌ Error generating hash";
    }
    generateBtn.disabled = false;
  }, 50);
});

copyBtn.addEventListener("click", () => {
  const output = document.getElementById("output");

  if (!output.value) {
    status.textContent = "❌ Nothing to copy";
    return;
  }

  navigator.clipboard.writeText(output.value);
  status.textContent = "📋 Hash copied to clipboard";
});