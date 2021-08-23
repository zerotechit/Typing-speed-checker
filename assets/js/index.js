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
  reserved_key =
    reserved_keys +
    "ShiftLeft ShiftRight ControlLeft ControlRight AltLeft AltRight Insert Home Delete PageUp End PageDown ArrowUp ArrowDown ArrowLeft ArrowRight NumLock";
  let active_character = document.querySelector(".active_character");
  let next_character = active_character.nextSibling;
  if (!reserved_key.includes(e.code.toString())) {
    if (
      e.key == active_character.textContent ||
      (e.key == "Enter" && active_character.innerHTML == "<br><br>")
    ) {
      //Sound Play
      if (document.ztp_sound_activity.ztp_sound_active.checked) {
        let audio = new Audio("typing-single-hit_NWM.mp3");
        audio.volume = 0.2;
        audio.play();
      }
      //Sound Play
      next_character = active_character.nextElementSibling;
      //Character Count
      let character_coun = document.querySelector(".ztp_character_count");
      character_coun.textContent = parseInt(character_coun.textContent) + 1;
      //Generate text
      if (
        next_character.classList.contains("ztp_text_end") &&
        document.add_more_letter.querySelector("#ztp_pest_text").checked
      ) {
        generate_from_generatable();
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
    } else {
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
          let audio = new Audio("Beep_Computer_06.wav");
          audio.volume = 0.3;
          audio.play();
        }
        //Sound Play
      }
    }
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
  text_content[0].classList.add("active_character");
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
    } else if (e.key == "Escape") {
      document
        .querySelector(".ztp_container_active")
        .classList.remove("ztp_container_active");
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
}
//Generate text from input
document.generate_text_from_input_form.generate_text_from_input.addEventListener(
  "click",
  function () {
    document.querySelector(".generatable_text").dataset.start = 0;
    document.querySelector(".generatable_text").textContent =
      document.generate_text_from_input_form.usertext.value;
    document.generate_text_from_input_form.usertext.value = "";
    document
      .querySelector(".ztp_setting_container")
      .classList.remove("ztp_container_active");
    generate_from_generatable();
  }
);
function generate_from_generatable() {
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

function generate_text(e, start, end) {
  let text_holder = document.querySelector(".ztp_text");
  let generated_text = "";
  let all_characters =
    "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz ' , . / \\ ` ~ ! @ # $ % ^ & * ( ) _ - = + ; ";
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
  text_holder.innerHTML = generated_text;
  text_holder.querySelector("span").classList.add("active_character");
}
//ztp_add_letters_to_text
document.add_more_letter.add_letter.addEventListener("input", function () {
  document.querySelector(".ztp_character_amount").textContent =
    document.add_more_letter.add_letter.value;
});
