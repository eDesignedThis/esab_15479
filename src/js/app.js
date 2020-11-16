console.log("app is running");

$(document).ready(function () {
  var GetURL =
    "https://esabburnandearn.com/json/JsonMobile.ashx?action=mobile.offercode.details.get";

  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
  }

  $("#offer_code").keyup(function () {
    $(this).val($(this).val().toUpperCase());
  });

  $("#btn_offer_code").on("click", function () {
    hidePopUpError();

    var offerCode = $("#offer_code").val();
    if (offerCode != null) {
      offerCode.trim();
    }

    var purchaseDate = $("#purchase_date").val();
    if (purchaseDate != null) {
      purchaseDate.trim();
    }

    var error = validate(offerCode, purchaseDate);
    if (error != null) {
      showPopUpError(error);
    } else {
      hidePopUpError();
      submitDetails(offerCode, purchaseDate);
    }
  });

  function validate(offerCode, purchaseDate) {
    if (offerCode == null || offerCode.length == 0) {
      return "Offer Code is required.";
    }

    if (purchaseDate == null || purchaseDate.length == 0) {
      return "Purchase Date is required.";
    }

    return null;
  }

  function submitDetails(offerCode, purchaseDate) {
    $.ajax({
      type: "POST",
      url: GetURL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        offer_code: offerCode,
        purchase_date: purchaseDate,
      }),
      cache: false,
      success: function (data, status, xhr) {
        if (data != null && data.Result != "success") {
          showPopUpError(data.Result);
          return;
        } else {
          redirect(data);
        }
      },
    });
  }

  function redirect(data) {
    var id = data.PromotionId;
    window.location.href = "PromotionContent.aspx?promotion_id=" + id;
  }

  function showPopUpError(errorMessage) {
    $("#popError").html(errorMessage);
    $("#popError").show();
  }

  function hidePopUpError() {
    $("#popError").hide();
  }
});
