import { useState, useEffect } from 'react';

export interface Team {
  id: string;
  name: string;
  slug: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'admin' | 'member' | 'viewer';
  email: string;
  name?: string;
}

export interface TeamState {
  teams: Team[];
  currentTeam: Team | null;
  members: TeamMember[];
  loading: boolean;
  error: string | null;
}

export function useTeam() {
  const [teamState, setTeamState] = useState<TeamState>({
    teams: [],
    currentTeam: null,
    members: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Fetch teams for the current user
    const fetchTeams = async () => {
      try {
        // In a real implementation, this would be a fetch call to your teams endpoint
        const teamsResponse = await Promise.resolve([
          {
            id: 'team-1',
            name: 'My Team',
            slug: 'my-team',
          },
        ]);

        if (teamsResponse.length > 0) {
          // Set the first team as the current team
          const currentTeam = teamsResponse[0];
          
          // Fetch members for the current team
          const membersResponse = await Promise.resolve([
            {
              id: 'member-1',
              userId: 'user-1',
              teamId: currentTeam.id,
              role: 'admin' as const,
              email: 'user@example.com',
              name: 'Example User',
            },
          ]);

          setTeamState({
            teams: teamsResponse,
            currentTeam,
            members: membersResponse,
            loading: false,
            error: null,
          });
        } else {
          setTeamState({
            teams: [],
            currentTeam: null,
            members: [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setTeamState({
          ...teamState,
          loading: false,
          error: 'Failed to fetch teams',
        });
      }
    };

    fetchTeams();
  }, []);

  const createTeam = async (name: string) => {
    setTeamState({
      ...teamState,
      loading: true,
      error: null,
    });

    try {
      // In a real implementation, this would be a fetch call to create a team
      const newTeam = await Promise.resolve({
        id: `team-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      });

      setTeamState({
        ...teamState,
        teams: [...teamState.teams, newTeam],
        currentTeam: newTeam,
        loading: false,
      });

      return newTeam;
    } catch (error) {
      setTeamState({
        ...teamState,
        loading: false,
        error: 'Failed to create team',
      });
      throw error;
    }
  };

  const switchTeam = async (teamId: string) => {
    const team = teamState.teams.find(t => t.id === teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    setTeamState({
      ...teamState,
      loading: true,
    });

    try {
      // In a real implementation, this would fetch the team members
      const membersResponse = await Promise.resolve([
        {
          id: 'member-1',
          userId: 'user-1',
          teamId: team.id,
          role: 'admin' as const,
          email: 'user@example.com',
          name: 'Example User',
        },
      ]);

      setTeamState({
        ...teamState,
        currentTeam: team,
        members: membersResponse,
        loading: false,
      });
    } catch (error) {
      setTeamState({
        ...teamState,
        loading: false,
        error: 'Failed to switch team',
      });
      throw error;
    }
  };

  return {
    teams: teamState.teams,
    currentTeam: teamState.currentTeam,
    members: teamState.members,
    loading: teamState.loading,
    error: teamState.error,
    createTeam,
    switchTeam,
  };
}