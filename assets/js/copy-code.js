document.addEventListener('DOMContentLoaded', function() {
  // Get all the code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  
  // For each code block, create a copy button
  codeBlocks.forEach(function(codeBlock) {
    // Create the copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.type = 'button';
    copyButton.innerText = 'Copy';
    
    // Add the copy button to the code block's parent (the pre element)
    const pre = codeBlock.parentNode;
    pre.style.position = 'relative';
    pre.insertBefore(copyButton, codeBlock);
    
    // Add click event listener to the copy button
    copyButton.addEventListener('click', function() {
      // Create a range and select the code
      const range = document.createRange();
      range.selectNode(codeBlock);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      
      try {
        // Copy the selected text
        const successful = document.execCommand('copy');
        
        // Change the button text to indicate success or failure
        copyButton.innerText = successful ? 'Copied!' : 'Failed!';
        
        // Reset the button text after 2 seconds
        setTimeout(function() {
          copyButton.innerText = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Unable to copy code: ', err);
        copyButton.innerText = 'Failed!';
      }
      
      // Clear the selection
      window.getSelection().removeAllRanges();
    });
  });
});
