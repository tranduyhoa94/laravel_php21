/* eslint-disable prettier/prettier */
export default {
  props: {
    value: {
      type: Number
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => {}
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: "Prev"
    },
    nextText: {
      type: String,
      default: "Next"
    },
    breakViewText: {
      type: String,
      default: "…"
    },
    containerClass: {
      type: String
    },
    pageClass: {
      type: String
    },
    pageLinkClass: {
      type: String
    },
    prevClass: {
      type: String
    },
    prevLinkClass: {
      type: String
    },
    nextClass: {
      type: String
    },
    nextLinkClass: {
      type: String
    },
    breakViewClass: {
      type: String
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      default: "active"
    },
    disabledClass: {
      type: String,
      default: "disabled"
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: "First"
    },
    lastButtonText: {
      type: String,
      default: "Last"
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  beforeUpdate() {
    if ( this.forcePage === undefined ) {
      return;
    }
    if ( this.forcePage !== this.selected ) {
      this.selected = this.forcePage;
    }
  },
  computed: {
    selected: {
      get: function() {
        return this.value || this.innerValue;
      },
      set: function( newValue ) {
        this.innerValue = newValue;
      }
    },
    pages: function() {
      let items = {};

      if ( this.pageCount <= this.pageRange ) {
        for ( let index = 0; index < this.pageCount; index++ ) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1
          };

          items[ index ] = page;
        }
      } else {
        const halfPageRange = Math.floor( this.pageRange / 2 );

        let selectedRangeLow,
          selectedRangeHigh,
          setPageItem = ( index ) => {
            let page = {
              index: index,
              content: index + 1,
              selected: index === this.selected - 1
            };

            items[ index ] = page;
          },
          setBreakView = ( index ) => {
            let breakView = {
              disabled: true,
              breakView: true
            };

            items[ index ] = breakView;
          };
        // 1st - loop thru low end of margin pages

        for ( let i = 0; i < this.marginPages; i++ ) {
          setPageItem( i );
        }
        // 2nd - loop thru selected range
        selectedRangeLow = 0;

        if ( this.selected - halfPageRange > 0 ) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        selectedRangeHigh = selectedRangeLow + this.pageRange - 1;

        if ( selectedRangeHigh >= this.pageCount ) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (
          let i = selectedRangeLow;
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i++
        ) {
          setPageItem( i );
        }
        // Check if there is breakView in the left of selected range
        if ( selectedRangeLow > this.marginPages ) {
          setBreakView( selectedRangeLow - 1 );
        }
        // Check if there is breakView in the right of selected range
        if ( selectedRangeHigh + 1 < this.pageCount - this.marginPages ) {
          setBreakView( selectedRangeHigh + 1 );
        }
        // 3rd - loop thru high end of margin pages
        for (
          let i = this.pageCount - 1;
          i >= this.pageCount - this.marginPages;
          i--
        ) {
          setPageItem( i );
        }
      }
      return items;
    }
  },
  data() {
    return {
      innerValue: 1
    };
  },
  methods: {
    handlePageSelected( selected ) {
      if ( this.selected === selected ) {
        return;
      }
      this.innerValue = selected;
      this.$emit( "input", selected );
      this.clickHandler( selected );
    },
    prevPage() {
      if ( this.selected <= 1 ) {
        return;
      }
      this.handlePageSelected( this.selected - 1 );
    },
    nextPage() {
      if ( this.selected >= this.pageCount ) {
        return;
      }
      this.handlePageSelected( this.selected + 1 );
    },
    firstPageSelected() {
      return this.selected === 1;
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    },
    selectFirstPage() {
      if ( this.selected <= 1 ) {
        return;
      }
      this.handlePageSelected( 1 );
    },
    selectLastPage() {
      if ( this.selected >= this.pageCount ) {
        return;
      }
      this.handlePageSelected( this.pageCount );
    }
  }
};

