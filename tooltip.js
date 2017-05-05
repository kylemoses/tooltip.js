// Kyle Moses - For TextbookRush.com
var Tooltip = function() {
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
            $('.tooltip_box .tip_title').html(tooltip.traits[trait].title);
            $('.tooltip_box .tip_desc').html(tooltip.traits[trait].desc);
            if (bool) {
                $('.tooltip_box > span').hide();
            }
        }
    };
    //object for the Update method - content for the tooltip
    this.traits = {
        'noSup': {
            'title': 'Missing Supplements',
            'desc': 'This textbook may or may not include supplements the item came with when it was new. This could include a single-use access code, CD, or other supplemental item.'
        },
        'intEd': {
            'title': 'International Editions',
            'desc': 'International Editions and Low Price Editions are textbooks manufactured by publishers for sale in other countries.'
        },
        'CSC': {
            'title': 'CARD SECURITY CODE (CSS/CSV/CVV)',
            'desc': 'The Card Security Code (CSC) is a 3 or 4 digit number typically printed on the back of a credit card (in or near the signature field). The CSC is printed on the front of American Express cards.'
        },
        'StoreCredit': {
            'title': 'Store Credit',
            'desc': 'When you select store credit as your payment method, you will receive an additional 5% on your buyback.  '
        },
        'SellerName': {
            'title': 'Seller Name',
            'desc': 'Your seller nickname, or store name.'
        },
        'SellerEmail': {
            'title': 'Notification Email',
            'desc': 'Your notification email address is for automated emails from TextbookRush. This address is private.'
        },
        'SellerCSEmail': {
            'title': 'Customer Service Email',
            'desc': 'Your customer service address is public and will be displayed to all customers.'
        },
        'SellerTelephone': {
            'title': 'Seller Telephone',
            'desc': 'Valid telephone number required. This number is used by TextbookRush to contact you for important events or emergencies only. It will not be displayed to customers.'
        },
        'instEd': {
            'title': 'Instructor Edition',
            'desc': 'These books are identical in content to the student edition but may have additional publisher markings on them stating "Instructor&apos;s Edition" or similar verbiage.'
        },
        'FreeShipping': {
            'title': 'Free Shipping',
            'desc': 'TextbookRush offers free shipping for orders that contain over $35 worth of TextbookRush items. Items purchased from Marketplace sellers are not included in this total. Free shipping is eligible only in the continental United States and excludes Hawaii, Alaska and Puerto Rico.'
        },
        'StoreCred': {
            'title': 'Store Credit Applied',
            'desc': 'Any store credit you have on file with TextbookRush is applied to your order automatically.'
        },
        'whatsThis': {
            'title': 'Rush Rewards U',
            'desc': 'You can now earn rewards for everything you buy and sell on TextbookRush! By joining Rush Rewards U, you will earn one Carrot Coin and one XP for every dollar you spend or earn on our site. You can use your Carrot Coins to buy cool Rush Swag in the Rewards U Store, and you can level up and unlock new badges by earning XP. If you\'re not enrolled in the program, you can enroll and claim your rewards after you check out.'
        },
        'rentalNotice': {
            'title': 'Rental Notice',
            'desc': 'Rentals are made available randomly, but from available inventory and may be new or used copies of U.S. or international editions.  In any case, the book cover and jacket designs on International editions might differ from U.S. versions, and have different paper and bindings as well as colors and pictures that might vary in quality.  Used books may lack CD’s, access codes, and other supplemental materials.  Some rental items may ship separately.'
        },
        'StudyBrief': {
            'title': '<span class="hhCartTooltipTitle">Study Briefs</span>',
            'desc': '<span class="hhCartTooltipText">Study briefs are digital items providing quick reference information for a particular subject and are accessible only from your customer account.</span> <span class="hhCartTooltipText">Don’t have an account? Creating one is quick & easy. <a href="/account/create-account.aspx">Sign up now »</a></span>'
        },
        'TextbookSolution': {
            'title': '<span class="hhCartTooltipTitle">Rush Solutions</span>',
            'desc': '<span class="hhCartTooltipText">Rush Solutions are digital items containing select solutions for a particular textbook and are accessible only from your customer account.</span> <span class="hhCartTooltipText">Don’t have an account? Creating one is quick & easy. <a href="/account/create-account.aspx">Sign up now »</a></span>'
        },
        'hhPromo': {
            'desc': '<span class="hhCartTooltipText">Study Briefs and Rush Solutions are available only in digital form and are accessible only from your customer account.</span> <span class="hhCartTooltipText">Don’t have an account? Creating one is quick & easy. <a href="/account/create-account.aspx">Sign up now »</a></span>'
        }
    };
};
