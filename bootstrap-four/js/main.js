// For Starting Nicescroll
$(document).ready(function () {
  $("body").niceScroll({
    cursorcolor: "#ddd",
    cursorwidth: "15px",
    cursorborder: "none",
    cursorborderradius: "0",
  });
});

// Toggle Class On Opiton Section

var myOption = document.querySelector(".option-container .options"),
  myGear = document.querySelector(".option-container .gear-container");

myGear.onclick = function () {
  document
    .querySelector(".gear-container .fa-gear")
    .classList.toggle("fa-spin");
  myOption.classList.toggle("open");
};
// Variables
var list_ul = document.querySelectorAll(".nav-list li"),
  listLinks = document.querySelectorAll(".nav-list li a");
var myColorList = document.querySelectorAll(".option-color .list-unstyled li");

// Remove Class Active From li And add Class Actvie To li
listLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document;
    list_ul.forEach((li) => {
      li.classList.remove("active");

      li.addEventListener("click", (e) => {
        li.classList.add("active");
        document.querySelector(li.dataset.go).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  });
});
////////////////////////////////////////////////

// Local Storage For Color Box

var localColor = localStorage.getItem("option-color"),
  myColors = document.querySelectorAll(".option-color ul li");

if (localColor !== null) {
  document.documentElement.style.setProperty("--main-color", localColor);

  // Add Class Active And Remove IT From Others

  myColors.forEach((li) => {
    if (localColor === li.dataset.color) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

// Color Page By Once Clicking On The Color-box

myColors.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      li.dataset.color
    );

    localStorage.setItem("option-color", li.dataset.color);
    e.target.parentElement.parentElement
      .querySelectorAll(".active")
      .forEach((element) => {
        element.classList.remove("active");
      });

    li.classList.add("active");
  });
});

///////////////////////////////////////////

// Change Background
var myHeader = document.querySelector(".header-container"),
  myImages = ["h-01.png", "h-02.png", "h-03.png", "h-04.png"],
  backgroundOption = true,
  intervalBackground = "",
  backgroundSpan = document.querySelectorAll(".background-option span"),
  localBackground = localStorage.getItem("background-option"),
  bulletSpan = document.querySelectorAll(".bullet-option span"),
  localBullet = localStorage.getItem("bullet-option"),
  bulletContainer = document.querySelector(".bullets-container"),
  blockBullet = document.querySelector(".bullet-option .yes"),
  noneBullet = document.querySelector(".bullet-option .no"),
  resetAll = document.querySelector(".reset");

function randomBackground() {
  if (backgroundOption === true) {
    intervalBackground = setInterval(function () {
      var randomImage = Math.floor(Math.random() * myImages.length);
      myHeader.style.backgroundImage =
        'url("image/' + myImages[randomImage] + '")';
    }, 5000);
  }
}

backgroundSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomBackground();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(intervalBackground);
      localStorage.setItem("background-option", false);
    }
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

if (localBackground !== null) {
  if (localBackground === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".background-option span").forEach((element) => {
    element.classList.remove("active");
  });
  if (localBackground === "true") {
    document.querySelector(".background-option .yes").classList.add("active");
  } else {
    document.querySelector(".background-option .no").classList.add("active");
  }
}
randomBackground();
////////////////////////////////////////////

// Show And Hide Bullets

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.bullet === "block") {
      document.querySelector(".bullets-container").style.display = "block";
      localStorage.setItem("bullet-option", "block");
    } else {
      document.querySelector(".bullets-container").style.display = "none";
      localStorage.setItem("bullet-option", "none");
    }

    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

//////////////////////////////////////////////

// Local Storage For Bullets

if (localBullet !== null) {
  if (localBullet === "block") {
    bulletContainer.style.display = "block";
  } else {
    bulletContainer.style.display = "none";
  }

  document.querySelectorAll(".bullet-option span").forEach((element) => {
    element.classList.remove("active");
  });

  if (localBullet === "block") {
    blockBullet.classList.add("active");
  } else {
    noneBullet.classList.add("active");
  }
}

///////////////////////////////////////////////

// Reset All option Box

resetAll.onclick = function () {
  localStorage.removeItem("option-color");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullet-option");

  window.location.reload();
};

///////////////////////////////////////////////
// Fills Skills Of the Span

var skillSpan = document.querySelectorAll(".skills .progress .skill-span"),
  ourSkill = document.querySelector(".our-skills"),
  skillfSpan = document.querySelectorAll(".skills .progress .percent");

window.onscroll = function () {
  var windowOffset = window.pageYOffset,
    windowHeight = window.innerHeight,
    skillsOffset = ourSkill.offsetTop,
    skillsHeight = ourSkill.offsetHeight;

  skillSpan.forEach((span) => {
    if (windowOffset > skillsOffset + skillsHeight - windowHeight) {
      span.style.width = span.dataset.skill;
      skillfSpan.forEach((span) => {
        span.style.left = span.dataset.skill;
        span.style.display = "block";
      });
    }
  });
};

// Click On the Gallery Picture To Get Bigger

var galleryImg = document.querySelectorAll(".box-img img");

galleryImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    var overlayBack = document.createElement("div");
    overlayBack.className = "overlay-gallery";
    document.body.appendChild(overlayBack);

    var galleryContainer = document.createElement("div");
    galleryContainer.className = "gallery-container";

    overlayBack.appendChild(galleryContainer);

    var myImg = document.createElement("img");
    myImg.src = img.src;

    galleryContainer.appendChild(myImg);

    var closeOverlay = document.createElement("span"),
      textClose = document.createTextNode("X");
    closeOverlay.className = "close-btn";
    closeOverlay.appendChild(textClose);
    galleryContainer.appendChild(closeOverlay);

    closeOverlay.onclick = function () {
      this.parentElement.parentElement.style.display = "none";
    };

    overlayBack.onclick = function () {
      this.style.display = "none";
    };
  });
});

// Clik On the Bullets To To Their Section

var myBulllets = document.querySelector(".bullet"),
  bulletSection = document.querySelectorAll(".bullets-container .bullet"),
  navbarLi = document.querySelectorAll(".nav-list li");
navbarhref = document.querySelectorAll(".nav-list a");

function scrollGo(element) {
  bulletSection.forEach((element) => {
    element.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.go).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollGo("bulletSection");

////////////////////////////////////////

// click On Toggle menu To Show The List

var toggleButton = document.querySelector(".toggle-menu"),
  navList = document.querySelector(".nav-list");

toggleButton.onclick = function (e) {
  e.stopPropagation();
  navList.classList.toggle("open");
};

navList.onclick = function (e) {
  e.stopPropagation();
};

// Clicking On the Body To Remove Class("open")
document.addEventListener("click", (e) => {
  if (e.target !== navList) {
    navList.classList.remove("open");
  }
});

var myNav = document.querySelector(".navbar-container");
myHeader.style.height = ((window).innerHeight - myNav.innerHeight)