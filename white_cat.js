function cat_walk() {
  let mousePosX = 0;
  let mousePosY = 0;
  const cat_speed = 10;
  let catCount = 0; // Counter to keep track of the number of cats

  const spriteSets = {
    move: [
      [-3, 0],
      [-3, -1],
      [-5, -1],
      [-5, -2],
    ],
  };

  // Track mouse position
  document.onmousemove = (event) => {
    mousePosX = event.clientX;
    mousePosY = event.clientY;
  };

  // Helper function to set sprite frame
  function setSprite(catDiv, frame) {
    const sprite = spriteSets.move[frame % spriteSets.move.length];
    catDiv.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  // Function to create a cat and handle its movement
  function createCat(x = 32, y = 32) {
    const catDiv = document.createElement("div");
    catDiv.style.width = "32px";
    catDiv.style.height = "32px";
    catDiv.style.position = "fixed";
    catDiv.style.backgroundImage = "url('./white_cat.gif')";
    catDiv.style.imageRendering = "pixelated";
    catDiv.style.left = `${x}px`;
    catDiv.style.top = `${y}px`;

    document.body.appendChild(catDiv);
    catCount++; // Increment the cat counter

    let catPosX = x;
    let catPosY = y;

    const catWalk = setInterval(() => {
      const diffX = mousePosX - catPosX;
      const diffY = mousePosY - catPosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance > cat_speed) {
        catPosX += (diffX / distance) * cat_speed;
        catPosY += (diffY / distance) * cat_speed;
      } else {
        // When the cat reaches the mouse, delete it and spawn new cats
        clearInterval(catWalk);
        document.body.removeChild(catDiv);
        if (catCount < 100) {
          spawnCats(2); // Spawn two cats if the count is less than 100
        } else {
          spawnCats(1); // Spawn one cat if the count is 100 or more
        }
        return;
      }

      // Flip the cat if it's moving to the left
      if (diffX < 0) {
        catDiv.style.transform = "scaleX(-1)";
      } else {
        catDiv.style.transform = "scaleX(1)";
      }

      setSprite(catDiv, Math.floor(Date.now() / 100));
      catDiv.style.left = `${catPosX - 16}px`;
      catDiv.style.top = `${catPosY - 16}px`;
    }, 100);
  }

  // Spawn multiple cats
  function spawnCats(count) {
    for (let i = 0; i < count; i++) {
      const randomX = Math.random() * (window.innerWidth - 32);
      const randomY = Math.random() * (window.innerHeight - 32);
      createCat(randomX, randomY);
    }
  }

  // Create the initial cat
  createCat();
}

cat_walk();
