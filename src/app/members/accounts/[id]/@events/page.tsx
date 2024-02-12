import Typography from '@mui/material/Typography';

import Loading from './loading';

export default function EventsSection() {
  return (
    <>
      <Typography variant='h6' fontWeight='600' mt={2}>
        Sự kiện tham gia
      </Typography>
      {/* There is no api for this page, so now just load the skeletons */}
      <Loading />
    </>
  );
}
