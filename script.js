// Initialize build information
let buildNumber = 1;
let buildStatus = "Success";

// Function to update build information
function updateBuildInfo() {
    document.getElementById('build-number').textContent = `#${buildNumber}`;
    document.getElementById('status').textContent = buildStatus;
    document.getElementById('status').style.color = buildStatus === "Success" ? "#28a745" : "#dc3545";
    
    // Update timestamp
    const now = new Date();
    document.getElementById('timestamp').textContent = 
        now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
}

// Function to simulate a build
function simulateBuild() {
    const button = document.getElementById('refresh-btn');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Building...';
    button.disabled = true;
    
    // Simulate build process (3 seconds)
    setTimeout(() => {
        // Increment build number
        buildNumber++;
        
        // Randomly set status (80% success, 20% failure for demo)
        buildStatus = Math.random() > 0.2 ? "Success" : "Failed";
        
        // Update UI
        updateBuildInfo();
        
        // Animate the stages
        const stages = document.querySelectorAll('.stage');
        stages.forEach((stage, index) => {
            setTimeout(() => {
                stage.style.background = buildStatus === "Success" 
                    ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)" 
                    : "linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)";
                stage.style.color = "white";
                stage.style.transform = "scale(1.05)";
                
                // Reset animation after a delay
                setTimeout(() => {
                    stage.style.transform = "scale(1)";
                }, 500);
            }, index * 500);
        });
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show notification
        alert(`Build #${buildNumber} ${buildStatus === "Success" ? "completed successfully!" : "failed!"}`);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateBuildInfo();
    
    // Set up button click event
    document.getElementById('refresh-btn').addEventListener('click', simulateBuild);
    
    // Animate stages on page load
    setTimeout(() => {
        const stages = document.querySelectorAll('.stage');
        stages.forEach((stage, index) => {
            setTimeout(() => {
                stage.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                stage.style.color = "white";
                stage.style.transform = "scale(1.05)";
                
                setTimeout(() => {
                    stage.style.transform = "scale(1)";
                }, 500);
            }, index * 300);
        });
    }, 1000);
});