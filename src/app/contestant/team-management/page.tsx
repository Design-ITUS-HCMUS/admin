'use client';
import { styled } from '@mui/material';
import React, { useState } from 'react';

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
  proofOfPayment: string; // URL
  submission: string; // URL
}

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

const Link = styled('a')({
  color: '#007bff',
});

export default function TeamManagement() {
  const [team, setTeam] = useState<Team>({
    id: 1,
    name: 'Team 1',
    teamLeader: { id: 1, name: 'Leader 1' },
    isPassed: false,
    category: { id: 1, name: 'Category 1' },
    paymentStatus: 'Paid',
    isVerified: true,
    proofOfPayment: 'http://example.com/proof.pdf',
    submission: 'http://example.com/submission.pdf',
  });

  return (
    <Container>
      <Title>Team Management</Title>
      <table>
        <tbody>
          <tr>
            <td>Team Name</td>
            <td>{team.name}</td>
          </tr>
          <tr>
            <td>Team Leader</td>
            <td>{team.teamLeader.name}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{team.category.name}</td>
          </tr>
          <tr>
            <td>Payment Status</td>
            <td>{team.paymentStatus}</td>
          </tr>
          <tr>
            <td>Is Verified</td>
            <td>{team.isVerified ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Proof of Payment</td>
            <td>
              <Link href={team.proofOfPayment}>Download</Link>
            </td>
          </tr>
          <tr>
            <td>Submission</td>
            <td>
              <Link href={team.submission}>Download</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
