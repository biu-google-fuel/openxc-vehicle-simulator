$(function() {
    var input = $( "#steering_wheel" );
    var slider = $( "<div id='slider'></div>" ).insertAfter( input ).slider({
      min: -600,
      max: 600,
      value: 0,
      slide: function( event, ui ) {
          input.val(ui.value);
          jQuery.post($SCRIPT_ROOT + '/_set_data', {name: "angle", value: ui.value});
      }
    });
    $( "#steering_wheel" ).change(function() {
        slider.slider( "value", this.value );
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "angle", value: this.value});
    });
  });

$(function() {
    var input = $( "#current_fuel_level" );
    var slider = $( "<div id='slider'></div>" ).insertAfter( input ).slider({
      min: 0,
      max: 40,
      value: 0,
      slide: function( event, ui ) {
          input.val(ui.value);
          jQuery.post($SCRIPT_ROOT + '/_set_data', {name: "current_fuel_level", value: ui.value});
      }
    });
    $( "#current_fuel_level" ).change(function() {
        slider.slider( "value", this.value );
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "current_fuel_level", value: this.value});
    });
  });

$(function() {
    var input = $( "#accelerator" );
    var slider = $( "<div id='slider'></div>" ).insertAfter( input ).slider({
      min: 0,
      max: 100,
        value: input.val(),
      slide: function( event, ui ) {
          input.val(ui.value);
          jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "accelerator", value: ui.value});
      }
    });
    $( "#accelerator" ).change(function() {
        slider.slider( "value", this.value );
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "accelerator", value: this.value});
    });
  });


$(function() {
    var input = $( "#brake" );
    var slider = $( "<div id='slider'></div>" ).insertAfter( input ).slider({
      min: 0,
      max: 100,
      value: 0,
      slide: function( event, ui ) {
          input.val(ui.value);
          jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "brake", value: ui.value});
      }
    });
    $( "#brake" ).change(function() {
        slider.slider( "value", this.value );
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "brake", value: this.value});
    });
  });

//Ignition radio buttons

$(function() {
    $( '#ignition_radio' ).buttonset();
});

$(function(){
    $( '#ig_off' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "ignition_status", value: 'off'});
    });
});

$(function(){
    $( '#ig_acc' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "ignition_status", value: 'accessory'});
    });
});

$(function(){
    $( '#ig_run' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "ignition_status", value: 'run'});
    });
});

$(function(){
    $( '#ig_start' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "ignition_status", value: 'start'});
    });
});

//Gear Lever Radio Buttons

$(function() {
    $( '#gear_radio' ).buttonset();
});

$(function(){
    $( '#gear_park' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "gear_lever_position", value: 'park'});
    });
});

$(function(){
    $( '#gear_drive' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "gear_lever_position", value: 'drive'});
    });
});

$(function(){
    $( '#gear_neutral' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "gear_lever_position", value: 'neutral'});
    });
});

$(function(){
    $( '#gear_reverse' ).change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "gear_lever_position", value: 'reverse'});
    });
});

//Single check boxes

$(function() {
    $('#parking_brake_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "parking_brake_status", value: this.checked});
    });
});

$(function() {
    $('#headlamp_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "headlamp_status", value: this.checked});
    });
});

$(function() {
    $('#high_beam_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "high_beam_status", value: this.checked});
    });
});

$(function() {
    $('#windshield_wiper_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "windshield_wiper_status", value: this.checked});
    });
});

$(function() {
    $('#driver_door_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "door_status", value: "driver", event: this.checked});
    });
});

$(function() {
    $('#passenger_door_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "door_status", value: "passenger", event: this.checked});
    });
});

$(function() {
    $('#right_rear_door_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "door_status", value: "rear_right", event: this.checked});
    });
});

$(function() {
    $('#left_rear_door_check').change(function(){
        jQuery.post($SCRIPT_ROOT + '/_set_data', { name: "door_status", value: "rear_left", event: this.checked});
    });
});

    function StartTimer() {
        setInterval(function(){
            GetData();
        }, 1000);
    }

    function ParseData(dataJSON) {
        document.getElementById("torque").innerHTML = (dataJSON.torque_at_transmission).toFixed(0);
        document.getElementById("engine_speed").innerHTML = (dataJSON.engine_speed).toFixed(0);
        document.getElementById("vehicle_speed").innerHTML = (dataJSON.vehicle_speed).toFixed(2);
        document.getElementById("fuel_consumed").innerHTML = (dataJSON.fuel_consumed_since_restart).toFixed(3);
        document.getElementById("odometer").innerHTML = (dataJSON.odometer).toFixed(3);
        document.getElementById("fuel_level").innerHTML = (dataJSON.fuel_level).toFixed(2);
        document.getElementById("latitude").innerHTML = (dataJSON.latitude).toFixed(6);
        document.getElementById("longitude").innerHTML = (dataJSON.longitude).toFixed(6);
    }

    function GetData() {
        $.getJSON($SCRIPT_ROOT + '/_get_data', ParseData );
    }

    window.onload = StartTimer();