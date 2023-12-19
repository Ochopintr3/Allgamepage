function openSignInPopup() {
    document.getElementById('signin-popup').style.display = 'flex';
}

function closeSignInPopup() {
    document.getElementById('signin-popup').style.display = 'none';
}

function openSignUpPopup() {
    closeSignInPopup();
    document.getElementById('signup-popup').style.display = 'flex';
}

function closeSignUpPopup() {
    document.getElementById('signup-popup').style.display = 'none';
}

function validateSignInForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    return true;
}

function validateSignUpForm(event) {
    event.preventDefault(); 

    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('signup-email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var signupPassword = document.getElementById('signup-password').value;
    var agreeTerms = document.getElementById('agreeTerms').checked;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullName.trim() === '') {
        alert('Please enter your full name.');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address for sign-up.');
        return false;
    }

    if (phoneNumber.trim() === '') {
        alert('Please enter your phone number.');
        return false;
    }

    if (signupPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    if (!agreeTerms) {
        alert('Please agree to the terms of use.');
        return false;
    }

    saveSignUpInfo(); 
    return true; 
}



document.querySelector('.signupd').addEventListener('click', function (event) {
    event.preventDefault(); 
    openSignUpPopup(); 
});

document.querySelector('.signin-link').addEventListener('click', function (event) {
    event.preventDefault();
    closeSignUpPopup();
    openSignInPopup();
});

function saveSignUpInfo() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('signup-email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var signupPassword = document.getElementById('signup-password').value;

    var userData = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: signupPassword
    };

    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);

    localStorage.setItem('users', JSON.stringify(users));

    closeSignUpPopup(); 

}

function validateSignInForm(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!user) {
        alert('Invalid email or password. Please try again.');
        return false;
    }

    signedInUser = user;

    

    closeSignInPopup();

    isLoggedIn = true;
    updateSignInButton();

    return true;
}



function openForgotPasswordPopup() {
    closeSignInPopup();
    document.getElementById('forgot-password-popup').style.display = 'block';
}

function closeForgotPasswordPopup() {
    document.getElementById('forgot-password-popup').style.display = 'none';
}

function sendResetLink() {
    var resetEmail = document.getElementById('reset-email').value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
        alert('Please enter a valid email address.');
        return false;
    }

    openSuccessPopup();
    closeForgotPasswordPopup();

    return false;
}

function openSuccessPopup() {
    document.getElementById('success-popup').style.display = 'flex';
}

function closeSuccessPopup() {
    document.getElementById('success-popup').style.display = 'none';
}

document.querySelector('.forgotpa').addEventListener('click', function (event) {
    event.preventDefault(); 
    openForgotPasswordPopup(); 
});

document.querySelector('.signin-link').addEventListener('click', function (event) {
    event.preventDefault();
    closeSuccessPopup();
    closeSignUpPopup();
    openSignInPopup();
});

document.getElementById('success-popup').addEventListener('click', function (event) {
    if (event.target === this) {
        closeSuccessPopup();
    }
});

function backToHome() {
    closeSuccessPopup();
}

var isLoggedIn = false;

function updateSignInButton() {
    var signInButton = document.querySelector('.singin');
    if (isLoggedIn) {
        signInButton.textContent = signedInUser.fullName;
        signInButton.onclick = function () {
            isLoggedIn = false;
            signedInUser = null;  
            updateSignInButton();
        };
    } else {
        signInButton.textContent = 'Sign In';
        signInButton.onclick = function () {
            openSignInPopup();
        };
    }
}

var signedInUser = null;


updateSignInButton();

function filterGames() {
    var links = document.querySelectorAll('.check a');
    var games = document.querySelectorAll(".saleContainer > div");

    games.forEach(function (game) {
      var gameId = parseInt(game.getAttribute("data-gameid"));
      var displayGame = links[0].classList.contains("active"); 

      if (!links[0].classList.contains("active")) {
        displayGame =
          (links[1].classList.contains("active") && (gameId == 7 || gameId == 8 || gameId == 9)) ||
          (links[2].classList.contains("active") && (gameId == 6 || gameId == 5 || gameId == 4)) ||
          (links[3].classList.contains("active") && (gameId == 1 || gameId == 2 || gameId == 3));
      }

      if (displayGame && game.style.display !== "block") {
        
        $(game).fadeIn({ duration: 500, easing: "swing" });
      } else if (!displayGame && game.style.display !== "none") {
        
        $(game).fadeOut({ duration: 500, easing: "swing" });
      }
    });
}

document.querySelectorAll('.check a').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelectorAll('.check a').forEach(function (otherLink) {
        otherLink.classList.remove("active");
      });
      link.classList.add("active");
      filterGames();
    });
});

document.getElementById('all').click();

filterGames();

function showGameInfo(gameId) {
    window.location.href = "gamepage.html?id=" + gameId;
}

function goToMainPage() {
    
    window.location.href = "Project.html";
}