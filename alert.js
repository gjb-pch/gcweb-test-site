(function ($) {
  window.fnames = new Array();
  window.ftypes = new Array();
  fnames[0] = 'EMAIL';
  ftypes[0] = 'email';
  fnames[1] = 'LANG';
  ftypes[1] = 'dropdown';
  fnames[7] = 'TOUSALLEV';
  ftypes[7] = 'dropdown';
  fnames[2] = 'FETECANDAY';
  ftypes[2] = 'dropdown';
  fnames[3] = 'BALWINTER';
  ftypes[3] = 'dropdown';
  fnames[4] = 'SONLIGHT';
  ftypes[4] = 'dropdown';
  fnames[5] = 'LUMILIGHTS';
  ftypes[5] = 'dropdown';
}(jQuery));
var $mcj = jQuery.noConflict(true);

var signupTitle = "Capital Experience Events Newsletter";
var lang = 'en';
var textsError = {};
textsError.alreadySignedUp = {
  enMatch: /.+ is already subscribed to list .+/,
  frMatch: /.+ est déjà abonné à la liste .+/,
  en: "The provided email address is already subscribed to the " + signupTitle + ".",
  fr: "L'adresse courriel fournie est déjà abonnée au " + signupTitle + "."
}
textsError.invalidEmail = {
  enMatch: /.+ is already subscribed to list .+/,
  frMatch: /.+ est déjà abonné à la liste .+/,
  en: "The provided email address is already subscribed to the " + signupTitle + ".",
  fr: "L'adresse courriel fournie est déjà abonnée au " + signupTitle + "."
}
textsError.tooManySignups = {
  enMatch: /Recipient .+ has too many recent signup requests/,
  frMatch: /Recipient .+ has too many recent signup requests/,
  en: "The provided email address has too many recent signup requests.",
  fr: "L'adresse courriel fournie a trop de demandes d'abonnements récentes."
}
textsError.tooManyAttempts = {
  enMatch: /Too many subscribe attempts for this email address/,
  frMatch: /Too many subscribe attempts for this email address/,
  en: "The provided email address has too many recent signup requests. Please try again in about 5 minutes.",
  fr: "L'adresse courriel fournie a trop de demandes d'abonnements récentes. Veuillez réessayer dans environ 5 minutes."
}

var textsSuccess = {};
textsSuccess.almostFinished = {
  enMatch: /Almost finished/,
  frMatch: /Presque terminé/,
  en: "Almost finished… We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you. It could take several minutes for the email to arrive. If you do not see the email within 5 minutes, please verify your junk mail or spam folder.",
  fr: "Presque terminé… Nous devons confirmer votre adresse courriel. Pour terminer le processus d'abonnement, veuillez cliquer sur le lien dans le courriel que nous venons de vous envoyer. Le courriel peut prendre plusieurs minutes pour apparaître dans votre boîte de réception. Si vous ne le voyez pas dans les 5 minutes qui suivent, veuillez vérifier vos pourriels ou votre dossier « spam »."
}
textsSuccess.thankYou = {
  enMatch: /Thank you for subscribing/,
  frMatch: /Merci de vous être abonné/,
  en: "Thank you for subscribing",
  fr: "Merci de vous être abonné"
}

var mcError = document.getElementById("mce-error-response");
var mcSuccess = document.getElementById("mce-success-response");
mcError.innerHTML = "";
mcSuccess.innerHTML = "";

var error = document.getElementById("mce-error-response-custom");
var success = document.getElementById("mce-success-response-custom");

var mceObserver = new MutationObserver(function (mutations, observer) {

  let userFeedbackMessage = "";

  mutations.forEach(function (mutation) {
    for (let [type, texts] of Object.entries(textsError)) {
      if (mutation.target.innerHTML.match(texts["enMatch"]) != null || mutation.target.innerHTML.match(texts["frMatch"]) != null) {
        userFeedbackMessage = texts[lang];
      } else if (mutation.target.innerHTML.length > 10) {
        let userFeedbackMessage = mutation.target.innerHTML;
        userFeedbackMessage = userFeedbackMessage.replace(": , ", ": ");
      }
    }
  })

  if (userFeedbackMessage != "") {
    clearAndHide();
    displayMessage(error, userFeedbackMessage);
  }
});
mceObserver.observe(mcError, {


  attributes: true,
  childList: true,
  characterData: true
});

var mcsObserver = new MutationObserver(function (mutations, observer) {

  let userFeedbackMessage = "";

  mutations.forEach(function (mutation) {
    for (let [type, texts] of Object.entries(textsSuccess)) {
      if (mutation.target.innerHTML.match(texts["enMatch"]) != null || mutation.target.innerHTML.match(texts["frMatch"]) != null) {
        userFeedbackMessage = texts[lang];
      }
    }
  })

  if (userFeedbackMessage != "") {
    clearAndHide();
    displayMessage(success, userFeedbackMessage);
    var form = document.getElementById("mc_embed_signup");
    form.parentNode.removeChild(form);
  }
});
mcsObserver.observe(mcSuccess, {
  attributes: true,
  childList: true,
  characterData: true
});

function clearAndHide() {
  error.classList.add("hidden");
  error.removeAttribute("role");
  error.innerHTML = "";
  success.classList.add("hidden");
  success.removeAttribute("role");
  success.innerHTML = "";
}

function displayMessage(target, message) {
  target.innerHTML = "<p>" + DOMPurify.sanitize(message) + "</p>";
  target.classList.remove("hidden");
  target.setAttribute("role", "alert");
  target.focus();
  target.scrollIntoView();
}
