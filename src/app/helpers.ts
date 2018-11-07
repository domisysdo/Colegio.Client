declare var toastr: any;
declare var jQuery: any;
declare var $: any;
declare var Clipboard: any;

export class Helpers {
  static setLoading(loading) {
    const body = $('body');
    if (loading) {
      $('.preloader-backdrop').fadeIn(200);
    } else {
      $('.preloader-backdrop').fadeOut(200);
    }
  }

  static bodyClass(Class) {
    $('body').attr('class', Class);
  }

  static initLayout() {
    // SIDEBAR ACTIVATE METISMENU
    $('.metismenu').metisMenu();

    // SIDEBAR TOGGLE ACTION
    $('.js-sidebar-toggler').click(function() {
      if ($('body').hasClass('drawer-sidebar')) {
        $('#sidebar').backdrop();
      } else {
        $('body').toggleClass('sidebar-mini');
        if (!$('body').hasClass('sidebar-mini')) {
          $('#sidebar-collapse').hide();
          setTimeout(function() {
            $('#sidebar-collapse').fadeIn(300);
          }, 200);
        }
      }
    });

    // QUICK SIDEBAR TOGGLE ACTION
    $('.quick-sidebar-toggler').click(function() {
      $('.quick-sidebar').backdrop();
    });

    // SEARCH BAR ACTION
    $('.js-search-toggler').click(function() {
      $('.search-top-bar')
        .backdrop()
        .find('.search-input')
        .focus();
    });

    // Session timeout

    let idle_timer;
    (function() {
      $('#timeout-activate').click(function() {
        if (+$('#timeout-count').val()) {
          activate(+$('#timeout-count').val());
        }
      });

      $('#timeout-reset').click(function() {
        reset();
      });

      function reset() {
        $(document).idleTimer('destroy');
        if (idle_timer) {
          clearTimeout(idle_timer);
        }
        $('#session-dialog').modal('hide');
        $('.timeout-toggler').removeClass('active');
        $('#timeout-reset-box').hide();
        $('#timeout-activate-box').show();
      }

      function activate(count) {
        $('#session-dialog').modal('hide');
        $('#timeout-reset-box').show();
        $('#timeout-activate-box').hide();
        $(document).idleTimer(count * 60000);

        setTimeout(function() {
          $('.timeout-toggler').addClass('active');
        }, (count - 1) * 60000);

        $(document).on('idle.idleTimer', function(event, elem, obj) {
          // function you want to fire when the user goes idle
          toastr.warning(
            'Your session is about to expire. The page will redirect after 15 seconds with no activity.',
            'Session Timeout Notification',
            {
              progressBar: true,
              timeOut: 5000
            }
          );
          idle_timer = setTimeout(timeOutHandler, 5000);
        });

        $(document).on('active.idleTimer', function(
          event,
          elem,
          obj,
          triggerevent
        ) {
          // function you want to fire when the user becomes active again
          clearTimeout(idle_timer);
          $(document).idleTimer('reset');
          toastr.clear();
          toastr.success('You returned to the active mode.', 'You are back.');
        });

        function timeOutHandler() {
          reset();
          alert(
            'Your session has expired. You can redirect this page or logout.'
          );
        }
      }
    })();
  }

  static initPage() {
    // Activate bootstrap select
    if ($('.selectpicker').length > 0) {
      $('.selectpicker').selectpicker();
    }

    // Activate Tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Activate slimscroll
    $('.scroller').each(function() {
      $(this).slimScroll({
        height: $(this).attr('data-height') || '100%',
        color: $(this).attr('data-color') || '#71808f',
        railOpacity: '0.9',
        size: '4px'
      });
    });

    $('.slimScrollBar').hide();

    // Pre Copy to clipboard

    if ($('.clipboard-copy').length > 0) {
      new Clipboard('.clipboard-copy', {
        target: function(t) {
          return t.nextElementSibling;
        }
      }).on('success', function(e) {
        e.clearSelection();
        e.trigger.textContent = 'Copied';
        window.setTimeout(function() {
          e.trigger.textContent = 'Copy';
        }, 2000);
      });
    }

    // PANEL ACTIONS
    // ======================

    $('.ibox-collapse').click(function() {
      const ibox = $(this).closest('div.ibox');
      ibox
        .toggleClass('collapsed-mode')
        .children('.ibox-body')
        .slideToggle(200);
    });
    $('.ibox-remove').click(function() {
      $(this)
        .closest('div.ibox')
        .remove();
    });
    $('.fullscreen-link').click(function() {
      if ($('body').hasClass('fullscreen-mode')) {
        $('body').removeClass('fullscreen-mode');
        $(this)
          .closest('div.ibox')
          .removeClass('ibox-fullscreen');
        $(window).off('keydown', toggleFullscreen);
      } else {
        $('body').addClass('fullscreen-mode');
        $(this)
          .closest('div.ibox')
          .addClass('ibox-fullscreen');
        $(window).on('keydown', toggleFullscreen);
      }
    });
    function toggleFullscreen(e) {
      // pressing the ESC key - KEY_ESC = 27
      if (e.which === 27) {
        $('body').removeClass('fullscreen-mode');
        $('.ibox-fullscreen').removeClass('ibox-fullscreen');
        $(window).off('keydown', toggleFullscreen);
      }
    }
  }
}
