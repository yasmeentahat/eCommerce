import './scss/style.scss';
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';


$(function () {

    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').on("click", function () {
        alert('أضيف المُنتج إلى عربة الشراء');
    });


    $('.product-option input[type="radio"]').on("change", function () {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    $('[data-remove-from-cart]').on("click", function () {
        $(this).parents('[data-product-info]').remove();

        calculateTotalPrice();
    });

    $('[data-product-quantity]').on("change", function () {

        var newQuantity = $(this).val();

        var $parent = $(this).parents('[data-product-info]');

        var pricePerUnit = $parent.attr('data-product-price');

        var totalPriceForProduct = newQuantity * pricePerUnit;

        $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        calculateTotalPrice();
    });

    function calculateTotalPrice() {

        var totalPriceForAllProducts = 0;

        $('[data-product-info]').each(function () {

            var pricePerUnit = $(this).attr('data-product-price');

            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });

        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }

    $('#form-checkout input[name="payment_method"]').on("change", function () {

        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery') {

            $('#credit-card-info input').prop('disabled', true);

        } else {

            $('#credit-card-info input').prop('disabled', false);
        }

        $('#credit-card-info').toggle();
    });

    $("#price-range").slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [250, 800],
        slide: function (event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });

});
