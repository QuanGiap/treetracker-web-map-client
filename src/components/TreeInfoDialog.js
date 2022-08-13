/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  ImageList,
  ImageListItem,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  SvgIcon,
} from '@mui/material';
import { useState } from 'react';
import { useFullscreen } from '../hooks/globalHooks';
import HeartIcon from '../images/icons/heart.svg';
import ShareIcon from '../images/icons/share-icon.svg';
import imagePlaceholder from '../images/image-placeholder.png';
import MaxIcon from '../images/max.svg';
import { makeStyles } from '../models/makeStyles';

const useStyles = makeStyles()(() => ({
  imageLarge: {
    maxWidth: '100%',
  },
  imageSmall: {
    borderRadius: 16,
    maxHeight: '100%',
  },
}));

function CustomListText(props) {
  const { primary, secondary } = props;
  return (
    <ListItemText
      primary={
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.04em',
          }}
        >
          {primary}
        </Typography>
      }
      secondary={
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          {secondary}
        </Typography>
      }
    />
  );
}

function CustomListAvatar(props) {
  const { src, alt } = props;
  return (
    <ListItemAvatar
      sx={{
        height: 56,
        width: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Avatar
        src={src}
        alt={alt}
        sx={{
          height: 48,
          width: 48,
        }}
      />
    </ListItemAvatar>
  );
}

function CustomImageItem(props) {
  const { src, alt, isActive } = props;
  const { classes } = useStyles();
  return (
    <ImageListItem
      sx={{
        background: (t) => (isActive ? t.palette.primaryLight.main : ''),
        borderRadius: 6,
        maxWidth: '132px',
        p: 2,
      }}
    >
      <img
        src={src}
        srcSet={src}
        alt={alt}
        loading="lazy"
        className={classes.imageSmall}
      />
    </ImageListItem>
  );
}

export default function TreeInfoDialog(props) {
  const { tree, planter, organization } = props;
  const { classes } = useStyles();

  const [open, setOpen] = useState(false);
  const isFullscreen = useFullscreen();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: 'pointer',
          '& img': {
            width: [40, 52],
            height: [40, 52],
          },
        }}
      >
        <SvgIcon
          inheritViewBox
          component={MaxIcon}
          sx={{ width: 52, height: 52 }}
        />
      </Box>
      <Dialog
        isFullscreen={isFullscreen}
        fullWidth
        open={open}
        onClose={handleClose}
        scroll={isFullscreen ? 'paper' : 'body'}
        PaperProps={{
          sx: {
            borderRadius: { sm: 0, md: 4 },
            m: 0,
            maxWidth: 1,
            width: '100vw',
            height: '100vh',
          },
        }}
        sx={{
          fontFamily: 'Lato',
          zIndex: 9999, // same index as zoom buttons
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            height: 'calc(100% - 32px)',
          }}
        >
          <Grid
            container
            columns={{ sm: 1, md: 4 }}
            sx={{
              height: 1,
              pb: 4,
            }}
          >
            <Grid item md={1}>
              <Typography
                sx={{
                  mr: 3.75,
                }}
                variant="h4"
                fontSize="24px"
              >
                Captures
              </Typography>
              <ImageList
                rowHeight={156}
                gap={8}
                sx={{
                  gridTemplateColumns: {
                    xs: 'repeat(3, 1fr) !important',
                    sm: 'repeat(4, 1fr) !important',
                    md: 'repeat(1, 1fr) !important',
                    lg: 'repeat(2, 1fr) !important',
                    xl: 'repeat(3, 1fr) !important',
                  },
                  justifyItems: 'center',
                  my: 0,
                  mt: 2,
                }}
              >
                <CustomImageItem
                  isActive
                  src={tree.image_url}
                  alt={`tree - #${tree.id}`}
                />
              </ImageList>
            </Grid>
            <Grid
              item
              md={2}
              sx={{
                maxHeight: 1,
                px: 4,
              }}
            >
              <Box
                sx={{
                  maxWidth: 1,
                  overflow: 'scroll',
                  borderRadius: 4,
                  maxHeight: 1,
                }}
              >
                <img
                  src={tree.image_url}
                  alt={`tree - #${tree.id}`}
                  className={classes.imageLarge}
                  style={{
                    maxHeight: '100%',
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              md={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ flex: '1' }}>
                <Typography variant="h4" fontSize="24px">
                  Palm Tree - {tree.id}
                </Typography>
                <Typography variant="h6">Eco-Peace-Vision</Typography>
                <List>
                  <ListItem sx={{ pl: 0 }}>
                    <CustomListAvatar
                      src={planter.image_url}
                      alt={`${planter.first_name} ${planter.last_name}`}
                    />
                    <CustomListText
                      primary="Planter"
                      secondary={`${planter.first_name} ${planter.last_name}`}
                    />
                  </ListItem>
                  {organization && (
                    <ListItem sx={{ pl: 0 }}>
                      <CustomListAvatar
                        // src={organization.logo_url}
                        src={imagePlaceholder}
                        alt={organization.name}
                      />
                      <CustomListText
                        primary="Planting Organization"
                        secondary={organization.name}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                }}
              >
                <Button
                  startIcon={
                    <SvgIcon
                      inheritViewBox
                      sx={{ height: 22, width: 24 }}
                      component={HeartIcon}
                    />
                  }
                  disableElevation
                  variant="contained"
                  color="primary"
                  sx={{
                    py: 3,
                    borderRadius: 3,
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                  }}
                >
                  200
                </Button>
                <Button
                  startIcon={
                    <SvgIcon
                      inheritViewBox
                      component={ShareIcon}
                      sx={{ height: 22, width: 16 }}
                    />
                  }
                  disableElevation
                  variant="contained"
                  color="background"
                  sx={{
                    color: 'text.text1',
                    py: 3,
                    borderRadius: 3,
                    backgroundColor: '#e1e2e2',
                    textTransform: 'none',
                    fontSize: '12px',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                  }}
                >
                  Share
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
