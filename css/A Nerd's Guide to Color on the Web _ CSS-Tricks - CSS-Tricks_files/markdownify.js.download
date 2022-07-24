(function (window, $) {

  'use strict';

  var jetpackLiveCommentMarkdownify = function() {

    var self = this,
        original_comment = '',
        previewActive = false;

    self.init = function() {

      // Insert Buttons and Preview Area
      $("<div />", {
        'class': 'preview-buttons',
        'id': "preview-buttons",
        'html': '\
          <a href="#0" id="writeCommentButton" class="commentPreviewButton active">Write</a>\
          <a href="#0" id="previewCommentButton" class="commentPreviewButton">Preview</a>'
      }).insertAfter("#comment");

      $('<div />', {
        'id': "markdown_comment",
        'class': "comment-content markdown-comment-preview"
      }).insertAfter("#comment");

      // Bind Events
      $(".commentPreviewButton").on('click', self.tab);

      // Is underscore.js a dependency of the theme then? Might be a bit much just for this.
      $("#previewCommentButton").on('click', self.serve);

    };

    /* Sends comment to server for Markdown processing */
    self.serve = function(event) {

      original_comment = $('#comment').val();

      // Don't do anything if preview is already active.
      if (previewActive) {
        return false;
      }

      $('#comment').hide();
      $('#markdown_comment').show().html('Combobulating comment preview...');

      $.post(
        markdownify.ajax_url,
        { action: 'markdownify', nonce : markdownify.nonce, comment_content : original_comment  },
        function(response) {
          self.display(response);
        },
        'json'
      );

      event.preventDefault();
    };

    /* Debounce tabbing events to endpoint */
    self.tab = function(event) {

      var clicked = $(this);

      if (!clicked.hasClass('active')) {
        $('.commentPreviewButton').removeClass('active');
        clicked.addClass('active');

        if (this.id == 'writeCommentButton') {
          $('#comment').val(original_comment).show();
          $('#markdown_comment').hide();
          previewActive = false;
        }
      } else {
        return;
      }

      event.preventDefault();
    };

    /* Display Markdownified result */
    self.display = function(response) {

      /* If we're successful, and we should be, let's display the Markdownified comment and make it readonly */
      if (response.success) {
        $('#comment').hide();
        $('#markdown_comment').html(response.data).show();
        previewActive = true;
      } else {
        /* Let users know that the Preview function is a bit jacked. */
        $('#comment').show();
        $('#markdown_comment').hide();
      }
    };

    /* Blastoff */
    $(function($) {
      self.init();
    });
  }

  window.jetpackLiveCommentMarkdownify = new jetpackLiveCommentMarkdownify();

})(window, jQuery);
