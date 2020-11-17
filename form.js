$(document).ready(function () {
  $('.phonefeild2 ,.phonefeild3').hide();
  var countryStateInfo = {
    "USA": [
      "California",
      "Texas"

    ],
    "India": [
      "Assam",
      "Gujarat"
    ]
  }
  window.onload = function () {

    //Get html elements	
    var countySel = document.getElementById("countySel");
    var stateSel = document.getElementById("stateSel");


    //Load countries
    for (var country in countryStateInfo) {
      countySel.options[countySel.options.length] = new Option(country, country);
    }

    //County Changed
    $(document).on('change', '#countySel', function () {
      // console.log(countryStateInfo[this.value]);
      stateSel.length = 1; // remove all options bar first
      var getcountry = countryStateInfo[this.value];
      getcountry.forEach(function (val, index, theArray) {
        stateSel.options[stateSel.options.length] = new Option(val, val);
      });
    })

  }




  $.validator.addMethod("minAge", function (value, element, min) {
    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();

    if (age > min + 1) {
      return true;
    }

    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= min;
  }, "You are not old enough!");

  $("form[name='registration']").validate({
    // Specify validation rules
    rules: {

      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      dob: {
        required: true,
        minAge: 13
      },
      number1: {
        required: true,
        minlength: 10,

      },
      zip: {
        required: true,
        minlength: 6,

      }
    },
    // Specify validation error messages
    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      dob: {
        required: "Please enter you date of birth.",
        minAge: "You must be at least 13 years old!"
      },
      number1: {
        required: "Please provide a number",
        minlength: "Your number must be at least 10 number"
      },

      email: "Please enter a valid email address"
    },
    zip: "Please enyer Zip code",
    minlenght: "Ypur zip code is atleast 6 digit",
    // minlenght:"Ypur zip code is atleast 6 digit",
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {

      console.log($('#fname').val());
      var fname = $('#fname').val();
      var lname = $('#lname').val();
      var email = $('#email').val();
      var dob = $('#dob').val();
      var phone1 = $('#Pnumber').val();
      var phone2 = $('#Pnumber2').val();
      var phone3 = $('#Pnumber3').val();
      if (!phone2) {
        var phone2 = '';
      }
      if (!phone3) {
        var phone3 = '';
      }

      var address = $('#address').val();
      var country = $('#country').val();
      var state = $('#state').val();
      var zip = $('#zip').val();
      // var lname = $('#fname').val();

      $('#myTable tbody').append('<tr><td><input type="checkbox" name="checkbox" class="childtr"></td><td>' + fname + ' ' + lname + '</td><td>' + email + '</td><td>' + dob + '</td><td>' + phone1 + '<br>' + phone2 + '<br>' + phone3 + '</td><td>' + address + '</td><td><i class="fa fa-trash fa-1x fa_delet delete"   aria-hidden="true"></i></td></tr>');

    }
  });

  //select phone number input

  $(document).on('click', '.add_phone', function () {
    var lastid = $(".phone_number:last").attr("attr_id");
    var split_id = lastid.split('_');
    var nextFeild = Number(split_id[1]) + 1;
    var total_num = $('.phone_number').length;
    var max = 3;
    if (total_num < max) {
      $('.phone_number:last').after('<div class="form-group formGrp_width phone_number padding10 phonefeild21"  attr_id = "div_' + nextFeild + '"><label for="Pnumber' + nextFeild + '"> Phone ' + nextFeild + ':</label> <input type="number" name="number2" onKeyPress="if(this.value.length == 12) return false" class="form-control PhoneWidth " id="Pnumber' + nextFeild + '"><i class="fa fa-trash fa-1x delete_num1" aria-hidden="true"></i></div>');
    }
    // if(count == 1){      
    //   $('.phonefeild2').show() ;
    // }else if(count >= 2){      
    //   $('.phonefeild3').show() ;
    //   $('.phonefeild2').show() ;      
    // }else if(count == 0){
    //   $('.phonefeild2,.phonefeild3').hide() ;
    //   $('.phonefeild2,.phonefeild3').empty();
    // }
    //if(count == )    $('.phonefeild2').hide(); 

  })

  //hide num 2 & 3
  $(document).on('click', '.delete_num1', function () {

    $(this).closest('div').remove();

  });


  //select all checkbox    
  $('.checkAll').click(function () {
    if (this.checked) {
      $(".childtr").attr('checked', "checked");
    } else {
      $(".childtr").removeAttr('checked', "checked");
    }
  });
  //delet single row
  $(document).on("click", '.delete', function () {
    if (confirm('are you sure ,you want to delete this user')) {
      $(this).closest('tr').remove();
    }
  });
  // Find and remove selected table rows
  $(".delete_row").click(function () {
    var check_length = $('.childtr:checked').length;
    if (check_length > 0) {
      if (confirm('Are you sure ,You want delete ' + check_length + ' users?')) {
        $("#myTable tbody").find('input[name="checkbox"]').each(function () {
          if ($(this).is(":checked")) {
            $(this).parents("tr").remove();
          }
        });
      }
      else {

      }
    }

  });



});

