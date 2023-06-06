// script.js

const usernameInput = document.getElementById('username-input');
const searchButton = document.getElementById('search-button');
const userDetails = document.getElementById('user-details');
const profileButton = document.getElementById('buttonbutton');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userRepos = document.getElementById('user-repos');
const userFollowers = document.getElementById('user-followers');

searchButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username !== '') {
    fetchUserDetails(username)
      .then((data) => {
        displayUserDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function fetchUserDetails(username) {
  const url = `https://api.github.com/users/${username}`;
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('User not found');
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

function displayUserDetails(user) {
  userAvatar.style.backgroundImage = `url(${user.avatar_url})`;
  userName.textContent = user.name || user.login;
  userRepos.textContent = `Repositories: ${user.public_repos}`;
  userFollowers.textContent = `Followers: ${user.followers}`;
  userDetails.classList.remove('hidden');
  profileButton.addEventListener('click', () => {
    window.location.href = user.html_url;
  });
}
