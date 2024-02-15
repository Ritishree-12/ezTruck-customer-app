export const COLORS = {
    PRIMARY: "#EE272E",
    TEXT: "grey",
    BORDER: "grey",
    BACKGROUND: "#fff",
  };
  
  export const FONTS = {
    TITLE: {
      color: COLORS.PRIMARY,
      fontWeight: "bold",
      fontSize: 22,
      // paddingHorizontal: 10,
      width:'100%',
      height:'6%'
    },
    TERMS: {
      color: COLORS.TEXT,
    },
    TERMS_HIGHLIGHT: {
      color: COLORS.PRIMARY,
    },
    // ... other font styles
  };
  
  export const SPACING = {
    MARGIN_VERTICAL: 8,
    PADDING_HORIZONTAL: 12,
  };

  export const commonInputStyle = {
    height:56,
    marginVertical: SPACING.MARGIN_VERTICAL,
    borderWidth: 1,
    paddingHorizontal: SPACING.PADDING_HORIZONTAL,
    borderRadius: 30,
    borderColor: COLORS.BORDER,
    color: COLORS.TEXT,
  };
  
  