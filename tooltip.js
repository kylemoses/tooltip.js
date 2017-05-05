// Kyle Moses - For TextbookRush.com
var Tooltip = function(traits) {
    var tooltip = this;
    var destroyTimeout;

    //Tooltip Methods
    this.init = function($this) {
        //Inject tooltip markup
        $('body').append(
            '<div class="tooltip_box">' +
            '<h4 class="tip_title"></h4>' +
            '<div class="tip_desc"></div>' +
            '<span><a href="/help/condition-edition.aspx">learn more</a></span>' +
            '</div>'
        );
        tooltip.events.reposition($this);
    };
    this.bindevents = function() {
        //Event handlers calling the tooltip methods
        $('body').on('mouseenter', '[data-trait]', function() {
            var $this = $(this);
            $('.tooltip_box').remove();
            clearTimeout(destroyTimeout);
            tooltip.init($this);
            //  console.log('trait mouse enter');
        });
        $('body').on('mouseleave', '[data-trait]', function() {
            tooltip.events.destroy();
            //  console.log('trait mouse leave');
        });
        $('body').on('mouseenter', '.tooltip_box', function() {
            tooltip.events.reset();
        });
        $('body').on('mouseleave', '.tooltip_box', function() {
            tooltip.events.destroy();
        });
    };
    this.events = {
        //reposition the tooltip box to the tooltip icon
        reposition: function($this) {
            var topPos = $this.offset().top,
                leftPos = $this.offset().left,
                oWidth = $this.outerWidth(),
                oheight = $this.height();

            // If the tooltip should appear off screen
            if ($(window).width() < 479) {
                $('.tooltip_box').css({
                    top: topPos + 35
                });
            } else {
                if (leftPos < 300) {
                    // move it to the right
                    $('.tooltip_box').css({
                        top: topPos - 20,
                        left: leftPos + oWidth + 10
                    });
                    $('.tooltip_arrow').hide();
                } else {
                    // Default show tooltip to the left;
                    $('.tooltip_box').css({
                        top: topPos - 20,
                        left: leftPos - 297
                    });
                }
            }
            this.update($this);
        },

        //Updates the content witin the tooltip box to 
        update: function($this) {
            var trait = $this.data('trait');
            switch (trait) {
                case 'noSup':
                    tooltip.events.updateTooltipInfo(trait, false);
                    break;
                case 'StoreCredit':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'FreeShipping':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'intEd':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'CSC':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'SellerName':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'SellerEmail':
                    tooltip.updateTooltipInfo(trait, true);
                    break;
                case 'SellerCSEmail':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'SellerTelephone':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'Instructor Edition':
                    tooltip.events.updateTooltipInfo(trait, false);
                    break;
                case 'StoreCred':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'whatsThis':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'rentalNotice':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'StudyBrief':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'TextbookSolution':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
                case 'hhPromo':
                    tooltip.events.updateTooltipInfo(trait, true);
                    break;
            }
            this.show($this);
        },

        //Show the tooltip
        show: function($this) {
            $('.tooltip_box').fadeIn(200);
        },

        //removes the tooltip from the DOM
        destroy: function() {
            destroyTimeout = setTimeout(function() {
                $('.tooltip_box').fadeOut(100, function() {
                    $(this).remove();
                });
            }, 220);
        },
        reset: function() {
            clearTimeout(destroyTimeout);
        },
        updateTooltipInfo: function(trait, bool) {
            if (tooltip.traits != undefined) {
                if (tooltip.traits[trait] != undefined) {
                    $('.tooltip_box .tip_title').html(tooltip.traits[trait].title);
                    $('.tooltip_box .tip_desc').html(tooltip.traits[trait].desc);
                }
                if (bool) {
                    $('.tooltip_box > span').hide();
                }
            }
        }
    };
    //object for the Update method - content for the tooltip
    this.traits = traits
};
