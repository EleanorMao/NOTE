$('#proof').change(function() {
    var name, src;

    if (this.files && this.files[0]) {
        name = this.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function(event) {
            $('.placeholder-img').css('background-image', 'url('
                this.result ')').html('');
        }
    } else {
        src = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\''
        this.value '\')';
        name = this.value.split('\\').pop();
        $('.placeholder-img').attr('style', src).html('');

    }
    name = name ? name : '未知文件名';
    $('#file-name').val(name);
});
