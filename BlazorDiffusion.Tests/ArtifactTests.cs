﻿using BlazorDiffusion.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorDiffusion.Tests;

[Explicit]
public class ArtifactTests
{
    IDbConnectionFactory ResolveDbFactory() => new ConfigureDb().ConfigureAndResolve<IDbConnectionFactory>();

    [Test]
    public async Task Can_update_Quality()
    {
        var client = new JsonApiClient("https://localhost:5001");
        await client.PostAsync(new Authenticate
        {
            provider = "credentials",
            UserName = "admin@email.com",
            Password = "p@55wOrd",
        });

        var api = await client.ApiAsync(new UpdateArtifact
        {
            Id = 571,
            Quality = -1,
        });
        if (api.Succeeded)
        {
            api.Response.PrintDump();
        }
    }

    [Test]
    public void Generate_all_artifact_slugs()
    {
        using var db = ResolveDbFactory().OpenDbConnection();
        var artifactsCount = db.RowCount(db.From<Artifact>());
        var emptyPrompts = db.RowCount(db.From<Artifact>().Where(x => x.Prompt == null || x.Prompt == ""));

        var prompts = db.ColumnDistinct<string>(db.From<Artifact>().SelectDistinct(x => x.Prompt));
        $"Checking {prompts.Count} unique prompts, {emptyPrompts} empty from {artifactsCount} artifacts...".Print();

        foreach (var prompt in prompts)
        {
            try
            {
                var slug = prompt.GenerateSlug();
            }
            catch (Exception e)
            {
                $"ERROR: {e.Message} for '{prompt}'".Print();
            }
        }
    }
}
