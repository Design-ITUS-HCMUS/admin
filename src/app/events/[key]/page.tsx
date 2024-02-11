'use client';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

interface IEvent {
  name: string;
  key: string;
  tag: string;
  start: string;
  status: string;
}

export default function EventDetails({ params }: { params: { key: string } }) {
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  useEffect(() => {
    fetch(`/api/event/${params.key}`)
      .then((res) => res.json())
      .then((res) => setEvent(res.data));
  });
  return (
    <Typography variant='h6' fontWeight='600'>
      Chi tiết sự kiện {event.name}
    </Typography>
  );
}
