﻿using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		protected override void CreateMappings()
		{
			CreateCommentMappings();
			CreateProjectMappings();
			CreateTaskMappings();
			CreateUserMappings();
		}
	}
}