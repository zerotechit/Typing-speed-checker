/*
const log = document.getElementById('log');
document.addEventListener('keydown', log_function);
function log_function(e) {
    log.textContent += e.key.toString();
}*/
//log function to type everything in a p tag

//Enable Disable editor functions
document.querySelector("html").addEventListener("click", function (e) {
  let class_holder = document.querySelector(".ztp_text_container");
  if (e.target.id == "ztp_text_container") {
    if (class_holder.classList.contains("ztp_editor_disabled")) {
      class_holder.classList.remove("ztp_editor_disabled");
    } else {
      ztp_time_pause();
      class_holder.classList.add("ztp_editor_disabled");
    }
  } else if (!class_holder.classList.contains("ztp_editor_disabled")) {
    ztp_time_pause();
    class_holder.classList.add("ztp_editor_disabled");
  }
});
//Creates animation in keyboard layout
document.addEventListener("keydown", ztp_keyboard_layout_animation);
function ztp_keyboard_layout_animation(e) {
  if (
    document
      .querySelector(".ztp_text_container")
      .classList.contains("ztp_editor_disabled")
  ) {
    return;
  }
  e.preventDefault();
  //keyboard animation
  let reserved_keys =
    "Escape PrintScreen Meta Pause ScrollLock F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12";
  if (
    !reserved_keys.includes(e.code.toString()) ||
    e.code.toString().includes("KeyF")
  ) {
    key_button = document.querySelector(
      '[data-key="' + e.code.toString() + '"]'
    ).parentElement;
    key_button.dataset.keypress = "on";
    //KeyUp Function
    document.addEventListener("keyup", ztp_keyup);
    function ztp_keyup(e) {
      if (
        !reserved_keys.includes(e.code.toString()) ||
        e.code.toString().includes("KeyF")
      ) {
        key_button = document.querySelector(
          '[data-key="' + e.code.toString() + '"]'
        ).parentElement;
        key_button.dataset.keypress = "off";
      }
    }
  }
  //Editor active character animation and some counting
  ztp_time_start();
  let all_characters =
    "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz ' \" , . / \\ ` ~ ! ? < > @ # $ % ^ & * ( ) _ - = + ; 1 2 3 4 5 6 7 8 9 0 [ ] { }";
  var active_character = document.querySelector(".active_character");
  var next_character = active_character.nextSibling;
  //Delete from wrong character on press BACKSPACE
  if (active_character.previousElementSibling.children.length >= 1 && e.key == 'Backspace') {
    let wrong_text_length = active_character.previousElementSibling.querySelectorAll('span').length;
    let wrong_texts = active_character.previousElementSibling.querySelectorAll('span');
    if (wrong_text_length > 2) {
      wrong_texts[wrong_text_length - 1].remove();
    } else if (wrong_text_length == 2) {
      wrong_texts[1].remove();
      if (active_character.previousElementSibling.classList.contains('start')) {
        active_character.previousElementSibling.innerHTML = "";
      }
      else if (active_character.previousElementSibling.children[0].textContent == ' ') {
        active_character.previousElementSibling.innerHTML = " ";
        active_character.previousElementSibling.classList.add('ztp_space');
      }
      else {
        active_character.previousElementSibling.innerHTML = active_character.previousElementSibling.children[0].textContent;
      }
    }
    //Sound Play
    if (document.ztp_sound_activity.ztp_sound_active.checked) {
      let audio = new Audio("typing-single-hit_NWM.mp3");
      audio.volume = parseInt(document.ztp_sound_activity.ztp_sound_volume.value) / 100;
      audio.play();
    }
  }
  if (all_characters.includes(e.key.toString())) {
    if (
      e.key == active_character.textContent && !active_character.previousElementSibling.children.length > 0 ||
      (e.key == "Enter" && active_character.innerHTML == "<br><br>" && !active_character.previousElementSibling.children.length > 0)
    ) {
      //Sound Play
      if (document.ztp_sound_activity.ztp_sound_active.checked) {
        let audio = new Audio("typing-single-hit_NWM.mp3");
        audio.volume = parseInt(document.ztp_sound_activity.ztp_sound_volume.value) / 100;
        audio.play();
      }
      //Sound Play
      next_character = active_character.nextElementSibling;
      //Character Count
      let character_coun = document.querySelector(".ztp_character_count");
      character_coun.textContent = parseInt(character_coun.textContent) + 1;
      //Generate text
      if (next_character.classList.contains("ztp_text_end")) {
        generate_from_generatable();
        auto_generate_text();
        if (document.ztp_sound_activity.ztp_sound_active.checked) {
          let audio = new Audio("seasson_complete_sound_1.wav");
          audio.volume = parseInt(document.ztp_sound_activity.ztp_sound_volume.value) / 100;
          audio.play();
        }
      }
      //Word Counter
      if (
        next_character.textContent == " " ||
        next_character.classList.contains("ztp_text_end")
      ) {
        document.querySelector(".ztp_word_count").textContent =
          parseInt(document.querySelector(".ztp_word_count").textContent) + 1;
      }
      //Active character
      next_character.classList.add("active_character");

      //add class done to correct character
      if (!active_character.classList.contains("wrong")) {
        active_character.classList.add("done");
      }
      active_character.classList.remove("active_character");
    }
    else {
      if (!document.stop_cursor_form.stop_cursor.checked) {
        if (active_character.previousElementSibling.children.length == 0) {
          if (e.key == '"') {
            if (active_character.previousElementSibling.classList.contains('ztp_space')) {
              active_character.previousElementSibling.classList.remove('ztp_space');
              active_character.previousElementSibling.innerHTML = '<span class="ztp_space"> </span><span class="ztp_wrong_text">"</span>';
            } else {
              active_character.previousElementSibling.innerHTML = '<span>' + active_character.previousElementSibling.textContent + '</span>' + '<span class="ztp_wrong_text">"</span>';
            }
          } else if (e.key == ' ') {
            if (active_character.previousElementSibling.classList.contains('ztp_space')) {
              active_character.previousElementSibling.classList.remove('ztp_space');
              active_character.previousElementSibling.innerHTML = "<span class='ztp_space'> </span><span class='ztp_wrong_text ztp_space'> </span>";
            } else {
              active_character.previousElementSibling.innerHTML = '<span>' + active_character.previousElementSibling.textContent + "</span><span class='ztp_wrong_text ztp_space'> </span>";
            }
          } else {
            if (active_character.previousElementSibling.classList.contains('ztp_space')) {
              active_character.previousElementSibling.classList.remove('ztp_space');
              active_character.previousElementSibling.innerHTML = "<span class='ztp_space'> </span><span class='ztp_wrong_text'>" + e.key + "</span>";
            } else {
              active_character.previousElementSibling.innerHTML = "<span>" + active_character.previousElementSibling.textContent + "</span><span class='ztp_wrong_text'>" + e.key + "</span>";
            }
          }
        }
        else if (active_character.previousElementSibling.children.length < 10) {
          if (e.code == 'Quote' && e.shiftKey) {
            active_character.previousElementSibling.innerHTML = active_character.previousElementSibling.innerHTML + '<span class="ztp_wrong_text">"</span>';
          } else if (e.key == " ") {
            active_character.previousElementSibling.innerHTML = active_character.previousElementSibling.innerHTML + '<span class="ztp_wrong_text ztp_space"></span>';
          } else {
            active_character.previousElementSibling.innerHTML = active_character.previousElementSibling.innerHTML + '<span class="ztp_wrong_text">' + e.key + '</span>';
          }
        }

      }
      if (
        !active_character.classList.contains("wrong") &&
        !active_character.classList.contains("ztp_error_counted") &&
        !active_character.classList.contains("ztp_text_end")
      ) {
        //Error Count
        document.querySelector(".ztp_error_count").textContent =
          parseInt(document.querySelector(".ztp_error_count").textContent) + 1;
        active_character.classList.add("ztp_error_counted");
      }
      if (!active_character.classList.contains("ztp_text_end")) {
        active_character.classList.add("wrong");
        //Sound Play
        if (document.ztp_sound_activity.ztp_sound_active.checked) {
          let audio = new Audio("error_tonal_buzz3_2.wav");
          audio.volume = parseInt(document.ztp_sound_activity.ztp_sound_volume.value) / 100;
          audio.play();
        }
        //Sound Play
      }
    }
  }
}
//Sound volume activity function
document.ztp_sound_activity.ztp_sound_volume.addEventListener('input', sound_activiry);
function sound_activiry() {
  document.ztp_sound_activity.querySelector('.ztp_sound_volume_value').innerHTML = document.ztp_sound_activity.ztp_sound_volume.value;
  document.ztp_sound_activity.ztp_sound_active.checked = true;
  if (parseInt(document.ztp_sound_activity.ztp_sound_volume.value) == 0) {
    document.ztp_sound_activity.ztp_sound_active.checked = false;
  }
}
//Reset function
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && e.ctrlKey) {
    reset_text();
  }
  if (e.key == "F2") {
    document
      .querySelector(".ztp_text_container")
      .classList.remove("ztp_editor_disabled");
  }
  if (e.key == 'ArrowUp') {
    document.ztp_sound_activity.ztp_sound_volume.value = parseInt(document.ztp_sound_activity.ztp_sound_volume.value) + 10;
    sound_activiry();
  }
  if (e.key == 'ArrowDown') {
    document.ztp_sound_activity.ztp_sound_volume.value = parseInt(document.ztp_sound_activity.ztp_sound_volume.value) - 10;
    sound_activiry();
  }
});
function reset_text() {
  ztp_time_pause();
  ztp_time_reset();
  document
    .querySelector(".ztp_text_container")
    .classList.add("ztp_editor_disabled");
  document.querySelector(".ztp_speed").textContent = "0";
  document.querySelector(".ztp_character_count").textContent = "0";
  document.querySelector(".ztp_word_count").textContent = "0";
  document.querySelector(".ztp_error_count").textContent = "0";
  document.querySelector(".ztp_hour").textContent = "00";
  document.querySelector(".ztp_minute").textContent = "00";
  document.querySelector(".ztp_second").textContent = "00";
  let text_content = document.querySelectorAll(".ztp_text span");
  for (i = 0; i < text_content.length; i++) {
    text_content[i].classList.remove("done");
    text_content[i].classList.remove("wrong");
    text_content[i].classList.remove("ztp_error_counted");
  }
  document
    .querySelector(".active_character")
    .classList.remove("active_character");
  text_content[1].classList.add("active_character");
}

//Speed count
function ztp_speed_count(m) {
  let character_count = parseInt(
    document.querySelector(".ztp_character_count").textContent
  );
  let wrong_character = parseInt(
    document.querySelector(".ztp_error_count").textContent
  );
  document.querySelector(".ztp_speed").textContent = (
    (character_count - wrong_character) /
    (5 * m)
  ).toFixed(0);
}
//Speed count
// Timer fumction Start

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

function ztp_time_start() {
  ztp_time_pause();
  cron = setInterval(() => {
    ztp_timer();
  }, 10);
}

function ztp_time_pause() {
  clearInterval(cron);
}

function ztp_time_reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.querySelector(".ztp_hour").innerText = "00";
  document.querySelector(".ztp_minute").innerText = "00";
  document.querySelector(".ztp_second").innerText = "00";
}
function ztp_timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
    ztp_speed_count(minute);
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.querySelector(".ztp_hour").innerText = returnData(hour);
  document.querySelector(".ztp_minute").innerText = returnData(minute);
  document.querySelector(".ztp_second").innerText = returnData(second);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`;
}

//Timer functon End

//Help functionality
document.addEventListener("keydown", function (e) {
  //disable editor
  if (e.key == "Escape") {
    ztp_time_pause();
    document
      .querySelector(".ztp_text_container")
      .classList.add("ztp_editor_disabled");
  }
  //Help closing function
  let help_container = document.querySelector(".help_container");
  if (
    document
      .querySelector(".ztp_text_container")
      .classList.contains("ztp_editor_disabled")
  ) {
    if (e.key == "?") {
      if (help_container.classList.contains("ztp_container_active")) {
        help_container.classList.remove("ztp_container_active");
      } else {
        help_container.classList.add("ztp_container_active");
      }
    } else if (e.key == "Escape" && document.querySelector('.ztp_setting_container ').classList.contains('ztp_container_active') || e.key == "Escape" && document.querySelector('.help_container').classList.contains('ztp_container_active')) {
      document
        .querySelector(".ztp_container_active")
        .classList.remove("ztp_container_active");
    } else if (e.key == 'S' && e.ctrlKey) {
      document.querySelector('.ztp_setting_container').classList.add('ztp_container_active');
    } else if (e.key == 'c' && e.ctrlKey && e.altKey) {
      if (document.stop_cursor_form.stop_cursor.checked) {
        document.stop_cursor_form.stop_cursor.checked = false;
      } else {
        document.stop_cursor_form.stop_cursor.checked = true;
      }
    }
  }
});

//Cursor changer

function cursor_changer(e) {
  if (e.value == "background") {
    document
      .querySelector(".ztp_text_container")
      .classList.remove("ztp_cursor_stick");
  } else {
    document
      .querySelector(".ztp_text_container")
      .classList.add("ztp_cursor_stick");
  }
}
function select_text_generator(e) {
  if (e.value == "Atuo_Generate") {
    document
      .querySelector(".ztp_setting_auto_generate")
      .classList.add("ztp_setting_content_active");
    document
      .querySelector(".ztp_setting_pest_text")
      .classList.remove("ztp_setting_content_active");
  } else {
    document
      .querySelector(".ztp_setting_auto_generate")
      .classList.remove("ztp_setting_content_active");
    document
      .querySelector(".ztp_setting_pest_text")
      .classList.add("ztp_setting_content_active");
  }
}
function added_character(e) {
  let character_holder = document.querySelector(
    ".ztp_added_character_container"
  ).children;
  for (let i = 0; i < 26; i++) {
    if (i < e.value) {
      character_holder[i].classList.add("ztp_added_character");
    } else {
      character_holder[i].classList.remove("ztp_added_character");
    }
  }
  auto_generate_text();
}
//Generate text from input
document.generate_text_from_input_form.generate_text_from_input.addEventListener(
  "click",
  function () {
    let minimun_character = parseInt(document.generate_text_from_input_form.querySelector('.ztp_minimum_character_amount').textContent);
    let written_character = document.generate_text_from_input_form.usertext.value.length;
    if (minimun_character <= written_character) {
      document.querySelector(".generatable_text").dataset.start = 0;
      document.querySelector(".generatable_text").textContent =
        document.generate_text_from_input_form.usertext.value;
      document
        .querySelector(".ztp_setting_container")
        .classList.remove("ztp_container_active");
      generate_from_generatable();
    }
  });
function generate_from_generatable() {
  if (document.add_more_letter.querySelector("#ztp_pest_text").checked) {
    let start = parseInt(
      document.querySelector(".generatable_text").dataset.start
    );
    let texts = document.querySelector(".generatable_text").textContent;
    let add_letter_value = parseInt(document.add_more_letter.add_letter.value);
    let end = add_letter_value + start;
    if (start + add_letter_value < texts.length) {
      generate_text(texts, start, end);
      document.querySelector(".generatable_text").dataset.start =
        add_letter_value + start;
    } else {
      generate_text(texts, start, texts.length);
      document.querySelector(".generatable_text").dataset.start = 0;
    }
  }
}

function generate_text(e, start, end) {
  let text_holder = document.querySelector(".ztp_text");
  let generated_text = "";
  let all_characters =
    "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz ' , . / \\ ` ~ ! ? < > @ # $ % ^ & * ( ) _ - = + ; 1 2 3 4 5 6 7 8 9 0 [ ] { }";
  let new_line_checker = "";
  for (let i = start; i < end; i++) {
    if (e[i] == " ") {
      generated_text += '<span class="ztp_space">' + e[i] + "</span>";
      new_line_checker = "";
    } else if (e[i] == '"') {
      generated_text += "<span>" + e[i] + "</span>";
      new_line_checker = "";
    } else if (e[i] == "\n") {
      if (new_line_checker != e[i]) {
        generated_text += '<span class="ztp_newline"><br><br></span>';
        new_line_checker = e[i];
      }
    } else {
      if (all_characters.includes(e[i])) {
        generated_text += "<span>" + e[i] + "</span>";
        new_line_checker = "";
      }
    }
  }
  generated_text += '<span class="ztp_text_end"></span>';
  generated_text = '<span class="start"></span>' + generated_text;
  text_holder.innerHTML = generated_text;
  text_holder.querySelectorAll("span")[1].classList.add("active_character");
  //generated text example
}
//ztp_add_letters_to_text
document.add_more_letter.add_letter.addEventListener("input", function () {
  document.querySelector(".ztp_character_amount").textContent =
    document.add_more_letter.add_letter.value;
  document.generate_text_from_input_form.querySelector('.ztp_minimum_character_amount').textContent = document.add_more_letter.add_letter.value;
});
//Minimum Character check on Pest Text
document.generate_text_from_input_form.usertext.addEventListener('input', function () {
  let minimun_character = parseInt(document.generate_text_from_input_form.querySelector('.ztp_minimum_character_amount').textContent);
  let written_character = document.generate_text_from_input_form.usertext.value.length;
  document.querySelector('.ztp_pest_text_character_count').textContent = written_character;
  if (written_character < minimun_character) {
    document.querySelector('.ztp_pest_text_character_count').style.color = 'red';
  } else {
    document.querySelector('.ztp_pest_text_character_count').style.color = 'yellowgreen';
  }
});
//Atuo Generate Text Functions
document.add_more_letter.add_letter.addEventListener('input', auto_generate_text);
function auto_generate_text() {
  //random generator
  function randInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }
  //random generator end
  if (document.querySelector('#ztp_auto_text').checked) {
    let character_list = ['e', 'a', 'n', 'r', 'i', 't', 'l', 's', 'o', 'u', 'd', 'y', 'c', 'h', 'g', 'm', 'p', 'b', 'k', 'v', 'w', 'f', 'z', 'x', 'q', 'j'];
    let punctuations = [",", ".", "?", "'", "\"", "/", ":", ";", "!", "\\", "~", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", "<", ">", "[", "]", "{", "}"]
    let letter_usability_count = parseInt(document.add_character_form.add_character.value);
    let enable_capital = document.enable_capital_punctuation.enable_capital.checked;
    let enable_punctuation = document.enable_capital_punctuation.enable_punctuation.checked;
    let text_length = parseInt(document.add_more_letter.add_letter.value);
    let word_max_size = 5 + (letter_usability_count / 10);
    let generating_text = "";

    for (let i = 0; i == 0;) {
      if (generating_text.length > text_length) { break }
      let word_size = randInt(1, word_max_size);
      if (enable_capital) {
        generating_text += character_list[randInt(0, letter_usability_count)].toUpperCase();
        word_size -= 1;
      }
      for (let x = 0; x < word_size; x++) {
        generating_text += character_list[randInt(0, letter_usability_count)];
      }
      if (enable_punctuation) {
        generating_text += punctuations[Math.floor(Math.random() * punctuations.length)] + " ";
      } else {
        generating_text += " ";
      }
    }
    generate_text(generating_text, 0, text_length);
    document.querySelector('.ztp_generated_text_example').innerHTML = "<p>" + generating_text + "</p>";
  }
}