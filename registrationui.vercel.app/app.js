document.getElementById('submit').addEventListener('click', function(e) {
  e.preventDefault();
  
  var err = isFormEmpty();
  if (err) {
    alert("Please Enter The Required Data");
    return;
  }

  let username = document.getElementById("name").value;
  let dob = document.getElementById("dob").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let city = document.getElementById("city").value;
  let institute = document.getElementById("institute").value;
  let qualification;

  var qual = document.getElementsByName("c");
  for (let i = 0; i < qual.length; i++) {
    if (qual[i].checked) {
      qualification = qual[i].value;
    }
  }

  const templateParams = {
    name: username,
    dob: dob,
    email: email,
    phone: phone,
    city: city,
    institute: institute,
    qualification: qualification,
  };

  show();

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function(response) {
      hide();
      window.location.href = "/success.html";
      resetForm();
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      hide();
      console.log('FAILED...', error);
    });
});

function isFormEmpty() {
  var err = false;
  for (let i = 0; i < requiredElements.length; i++) {
    if (requiredElements[i].value == "") {
      err = true;
      requiredElements[i].classList.add("ValidationError");
      requiredElements[i].classList.remove("ValidationSuccess");
    } else {
      requiredElements[i].classList.remove("ValidationError");
      requiredElements[i].classList.add("ValidationSuccess");
    }
  }
  return err;
}

function resetForm() {
  var fields = document.getElementsByTagName("input");
  for (let i = 0; i < fields.length; i++) {
    fields[i].value = "";
    fields[i].classList.add("unValidated");
    fields[i].classList.remove("ValidationSuccess");
  }
  var button = document.getElementById("submit");
  button.classList.remove("unValidated");
  button.value = "Update Response";
}

function show() {
  document.getElementById("spinner").classList.add("show");
}

function hide() {
  document.getElementById("spinner").classList.remove("show");
}
