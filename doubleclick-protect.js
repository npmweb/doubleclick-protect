/**
 * Doubleclick Protect
 *
 * A script to easily disable buttons when running a process.
 *
 * Examples:
 * - Form with no JS behavior
 *    $('#myform').submit(disableSubmitHandler);
 *
 * - Form with jQuery Validator
 *    $('#myform').validate({
 *      rules: {...},
 *      submitHandler:disableSubmitHandler
 *    });
 *
 * - Ajax form
 *    $('#mybutton').click(function(evt){
 *      var btn = this;
 *      var oldText = disableButton(btn);
 *      $.get( '...', function(data) {
 *        enableButton(btn,oldText);
 *        ...
 *      });
 *    });
 *
 * Author: Josh Justice <josh.justice@northpoint.org>
 */

/**
 * Use this as the submit handler for a jQuery Validator for a normal
 * submission form. Disables all submit buttons and submits the form.
 */
function disableSubmitHandler(formOrEvt) {
  if( formOrEvt.tagName && 'form' == formOrEvt.tagName.toLowerCase() ) {
    myForm = formOrEvt;
  } else if( formOrEvt.target ) {
    myForm = formOrEvt.target;
  } else {
    return false;
  }
  disableButton($(myForm).find('input[type=submit]'));
  // role=presentation is tinymce buttons; exclude those
  disableButton($(myForm).find('button[role!=presentation]'));
  myForm.submit();
  return true;
}

/**
 * Call this directly to disable a button. Used for Ajax calls.
 */
function disableButton(btn) {
  if( null == btn || 0 == btn.length) {
    return;
  }
  $(btn).attr('disabled','disabled');
  return _setButtonText(btn,'Submitting...');
}

/**
 * Call this directly to enable a button. Used for Ajax calls.
 */
function enableButton(btn,text) {
  $(btn).removeAttr('disabled');
  _setButtonText(btn,text);
}

/**
 * Helper to set the button text, whether it is a input type submit,
 * input type button, or button tag. Should not need to call directly.
 */
function _setButtonText(btn,text) {
  var oldText;
  switch( $(btn)[0].tagName.toLowerCase() ) {
    case 'input': // input type button or submit
      oldText = $(btn).attr('value');
      $(btn).attr('value',text);
      break;
    case 'button': // button tag
      oldText = $(btn).html();
      $(btn).html(text);
      break;
  }
  return oldText;
}
