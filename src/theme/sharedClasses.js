export const searchInput = theme => ({
  border: 'none',
  boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)', //0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)
  padding: '1.2rem',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,
  width: '100%',
  marginBottom: theme.spacing.unit * 3,
  height: '3.4rem',
  color: theme.palette.common.lightBlack,
  backgroundColor: theme.palette.common.white,
  borderRadius: '0.1px'
});
export const selectInput = theme => ({
  border: 'none',
  padding: '1.2rem',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,
  width: '100%',
  height: '3.4rem',
  color: theme.palette.common.lightBlack,
  backgroundColor: theme.palette.common.white,
  borderRadius: '0.1px'
});
export const dropShadow = theme => ({
  boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
});
export const searchInputMobile = theme => ({
  padding: theme.spacing.unit * 2,
  height: theme.spacing.unit * 6,
  marginBottom: theme.spacing.unit * 2
});
export const bodyLink = theme => ({
  color: theme.palette.secondary[500]
});
export const listLink = theme => ({
  '& + &:before': {
    content: '", "'
  }
});
export const mobilePadding = theme => ({
  paddingLeft: '20px',
  paddingRight: '20px'
});
export const boldFont = theme => ({
  fontWeight: '600'
});
export const italicFont = theme => ({
  fontStyle: 'italic'
});
export const dividerSpacing = theme => ({
  marginBottom: theme.spacing.unit * 4
});
