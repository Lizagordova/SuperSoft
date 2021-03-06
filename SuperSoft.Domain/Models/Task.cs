﻿using System;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class Task
	{
		public int Id { get; set; }
		public string Header { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime DeadlineDate { get; set; }
		public TaskType TaskType { get; set; }
		public TaskStatus Status { get; set; }
		public TaskPriority Priority { get; set; }
		public int Responsible { get; set; }
		public int Tester { get; set; }
		public int Author { get; set; }
	}
}