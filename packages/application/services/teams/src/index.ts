import { Team } from '@monorepo/models';
import { BaseService, Service } from '@monorepo/services';

export interface TeamService extends Service<Team> {
  addMember(teamId: string, userId: string): Promise<Team>;
  removeMember(teamId: string, userId: string): Promise<Team>;
}

export class TeamServiceImpl extends BaseService<Team> implements TeamService {
  constructor() {
    super();
    // Initialize with some demo data
    const now = new Date();
    this.items = [
      {
        id: 'team-1',
        name: 'Engineering',
        description: 'Engineering team',
        members: ['user-1'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'team-2',
        name: 'Design',
        description: 'Design team',
        members: [],
        createdAt: now,
        updatedAt: now,
      },
    ];
  }

  async addMember(teamId: string, userId: string): Promise<Team> {
    const team = await this.getById(teamId);
    
    if (team.members.includes(userId)) {
      return team; // User is already a member
    }
    
    const updatedTeam = {
      ...team,
      members: [...team.members, userId],
      updatedAt: new Date(),
    };
    
    return this.update(teamId, updatedTeam);
  }

  async removeMember(teamId: string, userId: string): Promise<Team> {
    const team = await this.getById(teamId);
    
    if (!team.members.includes(userId)) {
      return team; // User is not a member
    }
    
    const updatedTeam = {
      ...team,
      members: team.members.filter(id => id !== userId),
      updatedAt: new Date(),
    };
    
    return this.update(teamId, updatedTeam);
  }
}

// Export a singleton instance
export const teamService = new TeamServiceImpl();