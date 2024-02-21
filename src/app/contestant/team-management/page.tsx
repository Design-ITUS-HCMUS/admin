'use client';
import { styled } from '@mui/material';
import React from 'react';
import Link from 'next/link';

interface Member {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
  teamLeader: Member;
  isPassed: boolean;
  category: Category;
  paymentStatus: string;
  isVerified: boolean;
  proofOfPayment: string;
  submission: string;
}

interface IRow {
  label: string;
  value: string;
}

const rows: IRow[] = [
  { label: 'Tên đội', value: 'Đội 1' },
  { label: 'Thành viên 1', value: 'Thành viên 1' },
  { label: 'Thành viên 2', value: 'Thành viên 2' },
  { label: 'Thành viên 3', value: 'Thành viên 3' },
  { label: 'Thành viên 4', value: 'Thành viên 4' },
  { label: 'Thể loại', value: 'Thể loại 1' },
  { label: 'Trạng thái thanh toán', value: 'Đã thanh toán' },
  { label: 'Đã xác nhận', value: 'Có' },
  { label: 'Minh chứng thanh toán', value: 'http://example.com/proof.pdf' },
  { label: 'Bài nộp', value: 'http://example.com/submission.pdf' },
];

const Container = styled('div')({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
});

const Title = styled('h1')({
  color: '#333',
  fontSize: '24px',
});

export default function TeamManagement() {
  const urlPattern = new RegExp('^(http|https)://', 'i');

  return (
    <Container>
      <Title>Team Management</Title>
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.label}</td>
              <td>{urlPattern.test(row.value) ? <Link href={row.value}>Tải về</Link> : row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
