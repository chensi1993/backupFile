/**
 * Created by chensi on 2017/8/1.
 */
$(document).ready(function () {
    var phone = $('#info_phone').text();
    var mphone = phone.substr(0, 3) + '****' + phone.substr(7);
    $('#info_phone').text(mphone);
});